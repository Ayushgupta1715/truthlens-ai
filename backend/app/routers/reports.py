import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.entities import Scan
from app.services.pdf_service import pdf_service

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/{scan_id}")
def download_scan_report(scan_id: str, db: Session = Depends(get_db)):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan record not found.")

    # Convert scan to dict
    analysis_list = []
    for a in scan.analysis_results:
        analysis_list.append({
            "model_name": a.model_name,
            "model_version": a.model_version,
            "prediction_details": a.prediction_details,
            "explanation": a.explanation
        })

    sources_list = []
    for s in scan.verification_sources:
        sources_list.append({
            "source_title": s.source_title,
            "source_url": s.source_url,
            "evidence_type": s.evidence_type,
            "relevance_score": s.relevance_score
        })

    scan_dict = {
        "id": scan.id,
        "content_type": scan.content_type,
        "input_reference": scan.input_reference,
        "prediction": scan.prediction,
        "confidence_score": scan.confidence_score,
        "status": scan.status,
        "created_at": scan.created_at,
        "analysis_results": analysis_list,
        "verification_sources": sources_list
    }

    try:
        pdf_path = pdf_service.generate_scan_report(scan_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF report: {str(e)}")

    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=500, detail="Generated report file not found on disk.")

    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename=f"TruthLens_Report_{scan.id[:8]}.pdf"
    )
