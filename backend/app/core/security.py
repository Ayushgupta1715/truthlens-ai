import os
import hmac
import hashlib
import json
import base64
import time
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

from app.config import settings

# Robust password hashing
try:
    import bcrypt
    HAS_BCRYPT = True
except ImportError:
    HAS_BCRYPT = False

def hash_password(password: str) -> str:
    if HAS_BCRYPT:
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    else:
        # Standard library secure fallback: PBKDF2 HMAC SHA-256
        salt = os.urandom(16).hex()
        dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return f"pbkdf2:{salt}:{dk.hex()}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    if HAS_BCRYPT and (hashed_password.startswith("$2b$") or hashed_password.startswith("$2a$")):
        try:
            return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
        except Exception:
            return False
    elif hashed_password.startswith("pbkdf2:"):
        try:
            parts = hashed_password.split(":")
            salt = parts[1]
            stored_hash = parts[2]
            dk = hashlib.pbkdf2_hmac('sha256', plain_password.encode('utf-8'), salt.encode('utf-8'), 100000)
            return hmac.compare_digest(dk.hex(), stored_hash)
        except Exception:
            return False
    else:
        # Simple sha256 fallback comparison
        dk = hashlib.sha256(plain_password.encode('utf-8')).hexdigest()
        return hmac.compare_digest(dk, hashed_password)

# Robust JWT creation and validation
try:
    import jwt
    HAS_PYJWT = True
except ImportError:
    HAS_PYJWT = False

def b64_url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode('utf-8').rstrip('=')

def b64_url_decode(data: str) -> bytes:
    padding = '=' * (4 - (len(data) % 4)) if len(data) % 4 != 0 else ''
    return base64.urlsafe_b64decode((data + padding).encode('utf-8'))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": int(expire.timestamp())})

    if HAS_PYJWT:
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    else:
        # Standard RFC 7519 JWT implementation using pure standard library
        header = {"alg": "HS256", "typ": "JWT"}
        h_str = b64_url_encode(json.dumps(header, separators=(',', ':')).encode('utf-8'))
        p_str = b64_url_encode(json.dumps(to_encode, separators=(',', ':')).encode('utf-8'))
        signing_input = f"{h_str}.{p_str}".encode('utf-8')
        signature = hmac.new(settings.SECRET_KEY.encode('utf-8'), signing_input, hashlib.sha256).digest()
        sig_str = b64_url_encode(signature)
        return f"{h_str}.{p_str}.{sig_str}"

def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    if HAS_PYJWT:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            return payload
        except Exception:
            return None
    else:
        try:
            parts = token.split('.')
            if len(parts) != 3:
                return None
            h_str, p_str, sig_str = parts
            signing_input = f"{h_str}.{p_str}".encode('utf-8')
            expected_sig = hmac.new(settings.SECRET_KEY.encode('utf-8'), signing_input, hashlib.sha256).digest()
            if not hmac.compare_digest(b64_url_encode(expected_sig), sig_str):
                return None
            
            payload = json.loads(b64_url_decode(p_str).decode('utf-8'))
            exp = payload.get("exp")
            if exp and int(time.time()) > exp:
                return None  # Token expired
            return payload
        except Exception:
            return None
