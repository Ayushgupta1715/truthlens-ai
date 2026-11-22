from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.entities import User, Scan, AnalysisResult, VerificationSource
from app.schemas.schemas import ClaimVerifyRequest, ScanResponse
from app.core.deps import get_optional_current_user
from app.services.fact_verification_service import fact_verification_service

router = APIRouter(prefix="/verify", tags=["Fact Verification"])

@router.post("/claim", response_model=ScanResponse)
def verify_claim(
    request: ClaimVerifyRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    if not request.claim.strip():
        raise HTTPException(status_code=400, detail="Claim statement cannot be empty.")

    res = fact_verification_service.verify_claim(request.claim)

    scan = Scan(
        user_id=current_user.id if current_user else None,
        content_type="claim",
        input_reference=request.claim,
        prediction=res["prediction"],
        confidence_score=res["confidence_score"],
        status="completed"
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    analysis = AnalysisResult(
        scan_id=scan.id,
        model_name="RAG Semantic Evidence Matcher",
        model_version="1.1.0",
        prediction_details={
            "indicators": res["indicators"],
            "keywords_extracted": res["keywords_extracted"]
        },
        explanation=res["explanation"]
    )
    db.add(analysis)

    # Save sources
    for src in res.get("sources", []):
        v_source = VerificationSource(
            scan_id=scan.id,
            source_title=src["title"],
            source_url=src.get("url"),
            evidence_type=src.get("evidence_type", "neutral"),
            relevance_score=src.get("relevance_score", 0.0)
        )
        db.add(v_source)

    db.commit()
    db.refresh(scan)

    return scan
