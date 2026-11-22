from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

# --- Auth Schemas ---
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "user"

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class TokenData(BaseModel):
    user_id: Optional[str] = None
    role: Optional[str] = None

# --- Detection Schemas ---
class NewsDetectRequest(BaseModel):
    headline: Optional[str] = ""
    article_text: str

class ClaimVerifyRequest(BaseModel):
    claim: str

class VerificationSourceSchema(BaseModel):
    id: Optional[str] = None
    source_title: str
    source_url: Optional[str] = None
    evidence_type: str  # "supporting", "contradicting", "neutral"
    relevance_score: float

    class Config:
        from_attributes = True

class AnalysisResultSchema(BaseModel):
    id: Optional[str] = None
    model_name: str
    model_version: str
    prediction_details: Optional[Dict[str, Any]] = None
    explanation: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ScanResponse(BaseModel):
    id: str
    user_id: Optional[str] = None
    content_type: str
    input_reference: str
    prediction: str
    confidence_score: float
    status: str
    created_at: datetime
    analysis_results: Optional[List[AnalysisResultSchema]] = []
    verification_sources: Optional[List[VerificationSourceSchema]] = []

    class Config:
        from_attributes = True

# --- Dashboard & Admin Schemas ---
class DashboardStats(BaseModel):
    total_scans: int
    news_scans: int
    image_scans: int
    video_scans: int
    claim_scans: int
    fake_count: int
    authentic_count: int
    unverified_count: int
    recent_scans: List[ScanResponse]

class ModelMetricSchema(BaseModel):
    id: str
    model_name: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    evaluated_at: datetime

    class Config:
        from_attributes = True

class AdminStats(BaseModel):
    total_users: int
    total_scans: int
    module_distribution: Dict[str, int]
    prediction_distribution: Dict[str, int]
    model_metrics: List[ModelMetricSchema]
