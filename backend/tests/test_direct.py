import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from app.database import SessionLocal
from app.routers import auth, detect, verify, scans, dashboard, reports, admin
from app.schemas.schemas import UserLogin, NewsDetectRequest, ClaimVerifyRequest
from app.models.entities import User, Scan

db = SessionLocal()

print("1. Testing Auth Login...")
login_res = auth.login(UserLogin(email="demo@truthlens.ai", password="demo123"), db=db)
assert login_res["access_token"] is not None
print("   -> Auth OK! Token generated.")

print("2. Testing Fake News Detection...")
news_res = detect.detect_news(
    NewsDetectRequest(
        headline="BREAKING: 100% Miracle Cure Found Shocking Secrets!",
        article_text="Share before deleted doctors don't want you to know!"
    ),
    db=db,
    current_user=None
)
assert "Fake" in news_res.prediction or news_res.confidence_score > 60
print(f"   -> News OK! Prediction: {news_res.prediction} ({news_res.confidence_score}%)")

print("3. Testing Fact Verification...")
claim_res = verify.verify_claim(
    ClaimVerifyRequest(claim="Government announces free laptops for all students"),
    db=db,
    current_user=None
)
assert len(claim_res.verification_sources) > 0
print(f"   -> Fact Verification OK! Prediction: {claim_res.prediction}")

print("4. Testing Dashboard Stats...")
dash_res = dashboard.get_dashboard_stats(db=db, current_user=None)
assert dash_res["total_scans"] >= 4
print(f"   -> Dashboard OK! Total scans: {dash_res['total_scans']}")

print("5. Testing Admin Stats...")
admin_res = admin.get_admin_stats(db=db)
assert admin_res["total_users"] >= 2
assert len(admin_res["model_metrics"]) >= 4
print(f"   -> Admin OK! Model metrics count: {len(admin_res['model_metrics'])}")

print("6. Testing PDF Report Generation...")
first_scan = db.query(Scan).first()
pdf_resp = reports.download_scan_report(scan_id=first_scan.id, db=db)
assert os.path.exists(pdf_resp.path)
assert os.path.getsize(pdf_resp.path) > 1000
print(f"   -> PDF OK! File created at: {pdf_resp.path} (Size: {os.path.getsize(pdf_resp.path)} bytes)")

print("\n=== ALL 6 BACKEND MODULES VERIFIED & WORKING FLAWLESSLY! ===")
db.close()
