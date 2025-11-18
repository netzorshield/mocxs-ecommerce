@echo off
title MOCXS Admin Panel - Full Launcher
color 0B
chcp 65001 >nul

echo.
echo ========================================
echo   MOCXS Admin Panel - Full Launcher
echo   (Starts servers + Opens admin panel)
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Install from: https://nodejs.org/
    pause
    exit /b 1
)

REM Change to script directory
cd /d "%~dp0"

REM Check dependencies
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install >nul 2>&1
)

if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    pushd frontend
    call npm install >nul 2>&1
    popd
)

if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    pushd backend
    call npm install >nul 2>&1
    popd
)

echo.
echo ========================================
echo   Starting servers...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin:    http://localhost:3000/admin
echo.
echo Opening admin panel in 10 seconds...
echo.

REM Start servers in background and open admin panel
start "MOCXS Servers" cmd /c "npm run dev"

REM Wait for servers to start
timeout /t 10 /nobreak >nul

REM Open admin panel
start http://localhost:3000/admin

echo.
echo [OK] Admin panel opened!
echo.
echo Servers are running in the background window.
echo Close that window to stop servers.
echo.
pause












