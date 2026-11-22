@echo off
title TruthLens AI - Digital Media Verification Platform
echo =====================================================================
echo                TRUTHLENS AI - STARTUP LAUNCHER
echo        AI-Powered Fake News & Deepfake Detection Platform
echo =====================================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Backend Database & Seeding...
set PYTHONPATH=%cd%\backend
call backend\venv\Scripts\python.exe backend\seed.py

echo.
echo [2/3] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "TruthLens Backend (FastAPI)" cmd /k "cd /d %~dp0 && set PYTHONPATH=%cd%\backend && backend\venv\Scripts\uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 >nul

echo [3/3] Starting React Vite Frontend on http://localhost:5173 ...
start "TruthLens Frontend (React)" cmd /k "cd /d %~dp0\frontend && npm run dev"

echo.
echo =====================================================================
echo   TruthLens AI is starting!
echo   - Frontend: http://localhost:5173
echo   - Backend API Docs (Swagger): http://127.0.0.1:8000/docs
echo   - Demo Credentials:
echo       * Student/User: demo@truthlens.ai / demo123
echo       * Administrator: admin@truthlens.ai / admin123
echo =====================================================================
pause
