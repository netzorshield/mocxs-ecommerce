@echo off
title MOCXS E-commerce - Auto Start
color 0A
chcp 65001 >nul

REM Hide command window initially (can be enabled for debugging)
REM if "%1"=="hidden" goto hidden
REM start /min "" "%~f0" hidden
REM exit
REM :hidden

echo.
echo ========================================
echo   MOCXS E-commerce Website
echo   Auto-Start Application
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, restart this application.
    echo.
    pause
    exit /b 1
)

REM Change to script directory
cd /d "%~dp0"

REM Check if dependencies are installed
if not exist "node_modules\" (
    echo Installing dependencies... Please wait...
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

REM Clear ports if needed (optional - uncomment if needed)
REM netstat -ano | findstr :5000 >nul && (
REM     for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do taskkill /PID %%a /F >nul 2>&1
REM )
REM netstat -ano | findstr :3000 >nul && (
REM     for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /PID %%a /F >nul 2>&1
REM )

echo.
echo Starting servers...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul

REM Open browser
start http://localhost:3000

REM Start servers
call npm run dev

pause












