from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.entities import User, Scan
from app.schemas.schemas import ScanResponse
from app.core.deps import get_optional_current_user

router = APIRouter(prefix="/scans", tags=["Scan History"])

@router.get("", response_model=List[ScanResponse])
def get_scans(
    content_type: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    query = db.query(Scan)
    
    # Filter by user if logged in, otherwise show public/recent scans
    if current_user:
        query = query.filter((Scan.user_id == current_user.id) | (Scan.user_id == None))
    
    if content_type:
        query = query.filter(Scan.content_type == content_type)
        
    if search:
        query = query.filter(Scan.input_reference.ilike(f"%{search}%"))
        
    return query.order_by(Scan.created_at.desc()).offset(offset).limit(limit).all()

@router.get("/{scan_id}", response_model=ScanResponse)
def get_scan(scan_id: str, db: Session = Depends(get_db)):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan record not found.")
    return scan

@router.delete("/{scan_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_scan(
    scan_id: str,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan record not found.")
    
    # If user owns it or is admin or record is unassigned guest record
    if current_user and scan.user_id and scan.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Unauthorized to delete this scan.")

    db.delete(scan)
    db.commit()
    return None
