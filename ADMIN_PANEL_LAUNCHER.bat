@echo off
title MOCXS Admin Panel - Quick Launcher
color 0B
chcp 65001 >nul

echo.
echo ========================================
echo   MOCXS Admin Panel Launcher
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Change to script directory
cd /d "%~dp0"

REM Check if servers might be running
echo Checking server status...
timeout /t 1 /nobreak >nul

REM Open admin panel in default browser
echo.
echo Opening Admin Panel...
echo.
start http://localhost:3000/admin

echo [OK] Admin panel opened in browser!
echo.
echo ========================================
echo   Admin Panel: http://localhost:3000/admin
echo ========================================
echo.
echo If the page doesn't load:
echo   1. Make sure servers are running
echo   2. Run: npm run dev
echo   3. Wait for servers to start
echo   4. Then run this launcher again
echo.
pause












