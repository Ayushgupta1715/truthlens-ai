import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "TruthLens AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "truthlens_super_secret_jwt_key_2026_academic_mini_project")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./truthlens.db")
    UPLOAD_DIR: str = os.path.join(os.getcwd(), "uploads")

settings = Settings()

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "images"), exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "videos"), exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "reports"), exist_ok=True)
