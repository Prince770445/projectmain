@echo off
echo ===================================
echo Starting HubShop Application
echo ===================================
echo.

REM Check if MongoDB is running
docker ps | findstr pwa-shop-mongo >nul
if %errorlevel% neq 0 (
    echo Starting MongoDB...
    docker compose up -d
    timeout /t 3 >nul
) else (
    echo MongoDB is already running
)

echo.
echo Starting Backend Server...
start "HubShop Backend" cmd /k "cd /d C:\Users\CL354\OneDrive\Desktop\prince_project\backend && node server.js"

echo.
echo Waiting for backend to start...
timeout /t 3 >nul

echo.
echo Starting Frontend...
start "HubShop Frontend" cmd /k "cd /d C:\Users\CL354\OneDrive\Desktop\prince_project\frontend && npm start"

echo.
echo ===================================
echo Application is starting!
echo ===================================
echo.
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
echo Login credentials:
echo Email: demo@example.com
echo Password: password123
echo.
echo Press any key to exit this window...
pause >nul

