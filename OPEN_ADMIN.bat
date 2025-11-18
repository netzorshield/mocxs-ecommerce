@echo off
title MOCXS Admin Panel Launcher
color 0A

echo.
echo ========================================
echo   Opening MOCXS Admin Panel
echo ========================================
echo.

REM Check if servers are running
echo Checking if servers are running...
timeout /t 1 /nobreak >nul

REM Try to open admin panel
start http://localhost:3000/admin

echo.
echo Admin panel should open in your browser.
echo.
echo If it doesn't open:
echo   1. Make sure servers are running (npm run dev)
echo   2. Go to: http://localhost:3000/admin
echo.
pause












