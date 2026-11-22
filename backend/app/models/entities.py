import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship

from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default="user", nullable=False)  # "user" or "admin"
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    scans = relationship("Scan", back_populates="user", cascade="all, delete-orphan")

class Scan(Base):
    __tablename__ = "scans"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    content_type = Column(String(50), nullable=False)  # "news", "image", "video", "claim"
    input_reference = Column(Text, nullable=False)    # headline, text preview, or file path
    prediction = Column(String(50), nullable=False)   # "Likely Fake", "Likely Authentic", "Unverified", etc.
    confidence_score = Column(Float, nullable=False)  # 0.0 - 100.0 or 0.0 - 1.0
    status = Column(String(20), default="completed")  # "processing", "completed", "failed"
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="scans")
    analysis_results = relationship("AnalysisResult", back_populates="scan", cascade="all, delete-orphan")
    verification_sources = relationship("VerificationSource", back_populates="scan", cascade="all, delete-orphan")

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    scan_id = Column(String(36), ForeignKey("scans.id"), nullable=False)
    model_name = Column(String(100), nullable=False)
    model_version = Column(String(20), default="1.0.0")
    prediction_details = Column(JSON, nullable=True)  # JSON structure for indicators, frame details, tokens
    explanation = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    scan = relationship("Scan", back_populates="analysis_results")

class VerificationSource(Base):
    __tablename__ = "verification_sources"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    scan_id = Column(String(36), ForeignKey("scans.id"), nullable=False)
    source_title = Column(Text, nullable=False)
    source_url = Column(Text, nullable=True)
    evidence_type = Column(String(20), default="neutral")  # "supporting", "contradicting", "neutral"
    relevance_score = Column(Float, default=0.0)

    scan = relationship("Scan", back_populates="verification_sources")

class ModelMetric(Base):
    __tablename__ = "model_metrics"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    model_name = Column(String(100), nullable=False)
    accuracy = Column(Float, nullable=False)
    precision = Column(Float, nullable=False)
    recall = Column(Float, nullable=False)
    f1_score = Column(Float, nullable=False)
    evaluated_at = Column(DateTime, default=datetime.utcnow, nullable=False)
