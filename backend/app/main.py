import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.config import settings
from app.database import engine, Base, SessionLocal
from app.models.entities import User, Scan, AnalysisResult, VerificationSource, ModelMetric
from app.core.security import hash_password
from app.routers import auth, detect, verify, scans, dashboard, reports, admin, chat

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-Powered Fake News & Deepfake Detection Platform"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers under /api
app.include_router(auth.router, prefix="/api")
app.include_router(detect.router, prefix="/api")
app.include_router(verify.router, prefix="/api")
app.include_router(scans.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(reports.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(chat.router, prefix="/api")

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "timestamp": datetime.utcnow()
    }

# Database initial seeder on startup
@app.on_event("startup")
def seed_database():
    db = SessionLocal()
    try:
        # Check if users already exist
        if db.query(User).count() == 0:
            print("[INFO] Seeding initial users...")
            admin_user = User(
                name="Platform Admin",
                email="admin@truthlens.ai",
                password_hash=hash_password("admin123"),
                role="admin"
            )
            demo_user = User(
                name="Research Student",
                email="demo@truthlens.ai",
                password_hash=hash_password("demo123"),
                role="user"
            )
            db.add_all([admin_user, demo_user])
            db.commit()
            db.refresh(admin_user)
            db.refresh(demo_user)

            # Seed sample representative scans for instant demonstration
            s1 = Scan(
                user_id=demo_user.id,
                content_type="news",
                input_reference="BREAKING: Secret Miracle Herb Cures All Viruses in 24 Hours Banned By Doctors!",
                prediction="Potentially Fake",
                confidence_score=92.4,
                status="completed"
            )
            db.add(s1)
            db.commit()
            db.refresh(s1)

            a1 = AnalysisResult(
                scan_id=s1.id,
                model_name="TF-IDF + Linguistic Feature Classifier",
                model_version="1.2.0",
                prediction_details={
                    "indicators": [
                        "Sensationalist / clickbait terminology detected: miracle cure, banned from tv, secret",
                        "Excessive capitalization indicating emotional agitation",
                        "Lack of verifiable official sources or journalistic attributions"
                    ]
                },
                explanation="The text exhibits high stylistic markers associated with viral health misinformation."
            )
            db.add(a1)

            s2 = Scan(
                user_id=demo_user.id,
                content_type="claim",
                input_reference="Government has announced free laptops for all college students.",
                prediction="Unverified / Lacks Evidence",
                confidence_score=88.0,
                status="completed"
            )
            db.add(s2)
            db.commit()
            db.refresh(s2)

            a2 = AnalysisResult(
                scan_id=s2.id,
                model_name="RAG Semantic Evidence Matcher",
                model_version="1.1.0",
                prediction_details={
                    "indicators": [
                        "Cross-referenced against verified fact-checking records (Relevance: 94%)",
                        "Corroborating/refuting evidence found in trusted repositories"
                    ]
                },
                explanation="No official government scheme or gazette notification exists guaranteeing free laptops to all students."
            )
            db.add(a2)

            v1 = VerificationSource(
                scan_id=s2.id,
                source_title="PIB Fact Check: Viral Message Claiming Free Laptops is False",
                source_url="https://factcheck.pib.gov.in",
                evidence_type="contradicting",
                relevance_score=0.94
            )
            db.add(v1)

            s3 = Scan(
                user_id=demo_user.id,
                content_type="image",
                input_reference="political_rally_crowd_tampered.jpg",
                prediction="Potentially Manipulated",
                confidence_score=87.6,
                status="completed"
            )
            db.add(s3)
            db.commit()
            db.refresh(s3)

            a3 = AnalysisResult(
                scan_id=s3.id,
                model_name="Multi-Stream ELA & Residual Forensics",
                model_version="2.1.0",
                prediction_details={
                    "indicators": [
                        "Significant compression grid discontinuity (ELA deviation > 45)",
                        "Unnatural facial surface smoothing typical of generative AI synthesis"
                    ]
                },
                explanation="Forensic analysis detected abnormal visual indicators including error-level compression inconsistencies."
            )
            db.add(a3)

            s4 = Scan(
                user_id=demo_user.id,
                content_type="video",
                input_reference="interview_deepfake_speech.mp4",
                prediction="Potentially Manipulated Video (Deepfake Detected)",
                confidence_score=89.2,
                status="completed"
            )
            db.add(s4)
            db.commit()
            db.refresh(s4)

            a4 = AnalysisResult(
                scan_id=s4.id,
                model_name="Temporal CNN + Biometric Aggregator",
                model_version="1.4.0",
                prediction_details={
                    "indicators": [
                        "6 of 8 analyzed keyframes exhibited severe facial synthesis artifacts.",
                        "Temporal flickering and facial boundary warping detected between consecutive frames."
                    ]
                },
                explanation="Video analysis revealed high-frequency temporal inconsistencies and localized facial boundary artifacts."
            )
            db.add(a4)
            db.commit()
            print("[INFO] Sample seed records created successfully.")
    except Exception as e:
        print(f"[WARNING] Database seed error: {e}")
        db.rollback()
    finally:
        db.close()
