@echo off
title TruthLens AI - Push to GitHub
color 0b

echo ========================================================
echo         TruthLens AI - Automated GitHub Pusher
echo ========================================================
echo.
echo [1/3] Checking Git Status...
git status -s
echo.
echo [2/3] Setup GitHub Remote Repository
echo.
echo Please enter your GitHub Repository URL:
echo (Example: https://github.com/your-username/truthlens-ai.git)
echo.
set /p REPO_URL="Enter GitHub Repo URL: "

if "%REPO_URL%"=="" (
    echo.
    echo [ERROR] No URL entered. Please create a repository on GitHub first!
    echo Visit: https://github.com/new
    pause
    exit /b
)

echo.
echo Setting remote origin to: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo.
echo [3/3] Pushing all files to GitHub...
echo (If a browser window or popup opens, please click 'Sign in with your browser')
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! TruthLens AI is now live on your GitHub!
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   Push failed. Please make sure the repo exists and 
    echo   you have permission to push to it.
    echo ========================================================
)

echo.
pause
