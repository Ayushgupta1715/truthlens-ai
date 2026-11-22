import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"

def test_login():
    res = client.post("/api/auth/login", json={
        "email": "demo@truthlens.ai",
        "password": "demo123"
    })
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["user"]["email"] == "demo@truthlens.ai"

def test_fake_news_detection():
    # Test sensational headline
    res = client.post("/api/detect/news", json={
        "headline": "BREAKING: Miracle Cure 100% Proven Banned From TV Doctors Shocked!",
        "article_text": "Secret herbs cure all known ailments in hours share before it is deleted!"
    })
    assert res.status_code == 200
    data = res.json()
    assert "Fake" in data["prediction"] or data["confidence_score"] > 60

    # Test credible news
    res2 = client.post("/api/detect/news", json={
        "headline": "Federal Reserve Announces Policy Shift Following Economic Review",
        "article_text": "According to official statements released on Wednesday, researchers at the department of treasury published statistical data confirming moderate inflation growth."
    })
    assert res2.status_code == 200
    data2 = res2.json()
    assert "Authentic" in data2["prediction"] or data2["confidence_score"] > 60

def test_fact_verification():
    res = client.post("/api/verify/claim", json={
        "claim": "Government has announced free laptops for all college students"
    })
    assert res.status_code == 200
    data = res.json()
    assert "Unverified" in data["prediction"] or "Evidence" in data["prediction"]
    assert len(data["verification_sources"]) > 0

def test_dashboard_stats():
    res = client.get("/api/dashboard/stats")
    assert res.status_code == 200
    data = res.json()
    assert data["total_scans"] >= 4

def test_admin_stats():
    res = client.get("/api/admin/stats")
    assert res.status_code == 200
    data = res.json()
    assert data["total_users"] >= 2
    assert len(data["model_metrics"]) >= 4

def test_scans_and_report():
    scans_res = client.get("/api/scans")
    assert scans_res.status_code == 200
    scans = scans_res.json()
    assert len(scans) > 0
    first_id = scans[0]["id"]

    # Test PDF generation endpoint
    report_res = client.get(f"/api/reports/{first_id}")
    assert report_res.status_code == 200
    assert report_res.headers["content-type"] == "application/pdf"
    assert len(report_res.content) > 500
