from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional

from app.database import get_db
from app.models.entities import User, Scan
from app.schemas.schemas import DashboardStats, ScanResponse
from app.core.deps import get_optional_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    query = db.query(Scan)
    if current_user:
        query = query.filter((Scan.user_id == current_user.id) | (Scan.user_id == None))

    all_scans = query.all()
    total_scans = len(all_scans)

    news_scans = sum(1 for s in all_scans if s.content_type == "news")
    image_scans = sum(1 for s in all_scans if s.content_type == "image")
    video_scans = sum(1 for s in all_scans if s.content_type == "video")
    claim_scans = sum(1 for s in all_scans if s.content_type == "claim")

    fake_count = sum(1 for s in all_scans if any(k in s.prediction.lower() for k in ["fake", "manipulated", "false"]))
    authentic_count = sum(1 for s in all_scans if any(k in s.prediction.lower() for k in ["authentic", "verified"]))
    unverified_count = total_scans - (fake_count + authentic_count)

    recent_scans = query.order_by(Scan.created_at.desc()).limit(6).all()

    return {
        "total_scans": total_scans,
        "news_scans": news_scans,
        "image_scans": image_scans,
        "video_scans": video_scans,
        "claim_scans": claim_scans,
        "fake_count": fake_count,
        "authentic_count": authentic_count,
        "unverified_count": unverified_count,
        "recent_scans": recent_scans
    }
