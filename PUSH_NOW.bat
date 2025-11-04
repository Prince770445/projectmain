@echo off
echo ===================================
echo   Push HubShop to GitHub
echo ===================================
echo.
echo Step 1: Create repository at https://github.com/new
echo         Name: hubshop
echo         DO NOT initialize with README
echo.
echo Step 2: Enter your GitHub username below:
echo.
set /p GITHUB_USER="Enter your GitHub username: "
echo.
echo Connecting to GitHub...
"C:\Program Files\Git\bin\git.exe" remote remove origin 2>nul
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/%GITHUB_USER%/hubshop.git
"C:\Program Files\Git\bin\git.exe" branch -M main
echo.
echo Pushing to GitHub...
"C:\Program Files\Git\bin\git.exe" push -u origin main
echo.
if %errorlevel% equ 0 (
    echo.
    echo ===================================
    echo SUCCESS! Your code is on GitHub!
    echo ===================================
    echo.
    echo View at: https://github.com/%GITHUB_USER%/hubshop
    echo.
    start https://github.com/%GITHUB_USER%/hubshop
) else (
    echo.
    echo ERROR: Push failed. You may need to:
    echo 1. Create the repository first at https://github.com/new
    echo 2. Authenticate with GitHub (use GitHub Desktop for easier auth)
    echo.
)
pause

