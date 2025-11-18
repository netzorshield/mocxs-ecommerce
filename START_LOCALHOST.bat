@echo off
chcp 65001 >nul
echo ========================================
echo   Starting MOCXS Website on localhost:3000
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, restart your computer.
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version
npm --version
echo.

REM Check if dependencies are installed
if not exist "node_modules\" (
    echo [WARNING] Dependencies not installed!
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    pushd frontend
    call npm install
    popd
)

if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    pushd backend
    call npm install
    popd
)

echo.
echo ========================================
echo   Starting servers...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000  <-- OPEN THIS IN BROWSER
echo.
echo Press Ctrl+C to stop servers
echo.

REM Start both servers
call npm run dev

pause

