@echo off
title TruthLens AI - Push to Ayushgupta1715/truthlens-ai
color 0b

echo ========================================================
echo         TruthLens AI - GitHub Auto-Pusher
echo ========================================================
echo.
echo Target Repository: https://github.com/Ayushgupta1715/truthlens-ai.git
echo.
echo [1/2] Connecting remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/Ayushgupta1715/truthlens-ai.git
git branch -M main

echo.
echo [2/2] Pushing code to GitHub...
echo (A browser popup will open if you are not logged in - please click 'Authorize')
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! TruthLens AI is now live on your GitHub:
    echo   https://github.com/Ayushgupta1715/truthlens-ai
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   Push encountered an error. Please verify your login.
    echo ========================================================
)

echo.
pause
