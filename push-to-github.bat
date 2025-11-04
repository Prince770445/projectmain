@echo off
echo ===================================
echo Push HubShop to GitHub
echo ===================================
echo.

REM Check if remote already exists
"C:\Program Files\Git\bin\git.exe" remote -v >nul 2>&1
if %errorlevel% neq 0 (
    echo No remote repository configured.
    echo.
    echo Please follow these steps:
    echo.
    echo 1. Go to https://github.com/new
    echo 2. Create a new repository named "hubshop" (or your preferred name)
    echo 3. DO NOT initialize with README
    echo 4. Copy the repository URL
    echo.
    echo Then run this command:
    echo   git remote add origin YOUR_REPOSITORY_URL
    echo.
    echo Example:
    echo   git remote add origin https://github.com/YOUR_USERNAME/hubshop.git
    echo.
    pause
    exit /b
)

echo Current commits ready to push:
"C:\Program Files\Git\bin\git.exe" log --oneline -3
echo.
echo.

REM Rename branch to main if needed
"C:\Program Files\Git\bin\git.exe" branch -M main 2>nul

echo Pushing to GitHub...
"C:\Program Files\Git\bin\git.exe" push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ===================================
    echo SUCCESS! Your code is on GitHub!
    echo ===================================
    echo.
    "C:\Program Files\Git\bin\git.exe" remote -v
    echo.
) else (
    echo.
    echo ===================================
    echo ERROR: Push failed
    echo ===================================
    echo.
    echo Possible reasons:
    echo - GitHub repository doesn't exist yet
    echo - Authentication required (use GitHub Desktop or set up SSH)
    echo - Network connection issue
    echo.
    echo For first-time setup, use GitHub Desktop:
    echo https://desktop.github.com/
    echo.
)

pause

