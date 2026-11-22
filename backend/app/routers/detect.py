import os
import shutil
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.config import settings
from app.models.entities import User, Scan, AnalysisResult
from app.schemas.schemas import NewsDetectRequest, ScanResponse
from app.core.deps import get_optional_current_user
from app.services.fake_news_service import fake_news_service
from app.services.deepfake_image_service import deepfake_image_service
from app.services.deepfake_video_service import deepfake_video_service

router = APIRouter(prefix="/detect", tags=["Detection Modules"])

@router.post("/news", response_model=ScanResponse)
def detect_news(
    request: NewsDetectRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    if not request.article_text.strip():
        raise HTTPException(status_code=400, detail="Article text cannot be empty.")

    # Run NLP detection
    res = fake_news_service.detect(request.headline or "", request.article_text)

    # Save to database
    input_ref = request.headline if request.headline else request.article_text[:120]
    scan = Scan(
        user_id=current_user.id if current_user else None,
        content_type="news",
        input_reference=input_ref,
        prediction=res["prediction"],
        confidence_score=res["confidence_score"],
        status="completed"
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    analysis = AnalysisResult(
        scan_id=scan.id,
        model_name="TF-IDF + Logistic Classifier",
        model_version="1.2.0",
        prediction_details={
            "indicators": res["indicators"],
            "details": res["details"]
        },
        explanation=res["explanation"]
    )
    db.add(analysis)
    db.commit()
    db.refresh(scan)

    return scan

@router.post("/image", response_model=ScanResponse)
async def detect_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    # Validate extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".jpg", ".jpeg", ".png"]:
        raise HTTPException(status_code=400, detail="Invalid image format. Allowed formats: JPG, JPEG, PNG.")

    # Save file
    file_id = str(uuid.uuid4())
    filename = f"{file_id}{ext}"
    image_dir = os.path.join(settings.UPLOAD_DIR, "images")
    os.makedirs(image_dir, exist_ok=True)
    file_path = os.path.join(image_dir, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run detection
    res = deepfake_image_service.detect(file_path, filename=file.filename)

    scan = Scan(
        user_id=current_user.id if current_user else None,
        content_type="image",
        input_reference=file.filename,
        prediction=res["prediction"],
        confidence_score=res["confidence_score"],
        status="completed"
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    analysis = AnalysisResult(
        scan_id=scan.id,
        model_name="Multi-Stream ELA & Residual Forensics",
        model_version="2.1.0",
        prediction_details={
            "indicators": res["indicators"],
            "details": res["details"]
        },
        explanation=res["explanation"]
    )
    db.add(analysis)
    db.commit()
    db.refresh(scan)

    return scan

@router.post("/video", response_model=ScanResponse)
async def detect_video(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    # Validate extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".mp4", ".mov", ".avi"]:
        raise HTTPException(status_code=400, detail="Invalid video format. Supported formats: MP4, MOV, AVI.")

    file_id = str(uuid.uuid4())
    filename = f"{file_id}{ext}"
    video_dir = os.path.join(settings.UPLOAD_DIR, "videos")
    os.makedirs(video_dir, exist_ok=True)
    file_path = os.path.join(video_dir, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run video analysis
    res = deepfake_video_service.analyze_video(file_path, filename=file.filename)

    scan = Scan(
        user_id=current_user.id if current_user else None,
        content_type="video",
        input_reference=file.filename,
        prediction=res["prediction"],
        confidence_score=res["confidence_score"],
        status="completed"
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    analysis = AnalysisResult(
        scan_id=scan.id,
        model_name="Temporal CNN + Biometric Aggregator",
        model_version="1.4.0",
        prediction_details={
            "indicators": res["indicators"],
            "details": res["details"]
        },
        explanation=res["explanation"]
    )
    db.add(analysis)
    db.commit()
    db.refresh(scan)

    return scan

@router.get("/video/{scan_id}/status")
def get_video_status(scan_id: str, db: Session = Depends(get_db)):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found.")
    return {
        "scan_id": scan.id,
        "status": scan.status,
        "prediction": scan.prediction,
        "confidence_score": scan.confidence_score
    }
