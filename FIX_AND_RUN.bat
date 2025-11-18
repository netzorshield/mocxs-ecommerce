@echo off
chcp 65001 >nul
echo ========================================
echo   Fix Common Issues and Run Server
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not installed!
    echo Install from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version
npm --version
echo.

REM Check if in correct directory
if not exist "package.json" (
    echo [ERROR] Not in project root directory!
    echo Please navigate to D:\MOCXS first
    pause
    exit /b 1
)

echo [OK] In project directory
echo.

REM Install root dependencies
echo [1/3] Installing root dependencies...
if not exist "node_modules\" (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install root dependencies
        pause
        exit /b 1
    )
) else (
    echo [OK] Root dependencies already installed
)

REM Install frontend dependencies
echo [2/3] Installing frontend dependencies...
if not exist "frontend\node_modules\" (
    pushd frontend
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install frontend dependencies
        popd
        pause
        exit /b 1
    )
    popd
) else (
    echo [OK] Frontend dependencies already installed
)

REM Install backend dependencies
echo [3/3] Installing backend dependencies...
if not exist "backend\node_modules\" (
    pushd backend
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install backend dependencies
        popd
        pause
        exit /b 1
    )
    popd
) else (
    echo [OK] Backend dependencies already installed
)

echo.
echo ========================================
echo   Checking ports...
echo ========================================
echo.

REM Check port 5000
netstat -ano | findstr :5000 >nul
if %ERRORLEVEL% EQU 0 (
    echo [WARNING] Port 5000 is in use!
    echo.
    echo What's using port 5000:
    netstat -ano | findstr :5000
    echo.
    echo Kill the process? (Y/N)
    set /p kill5000=
    if /i "%kill5000%"=="Y" (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
            taskkill /PID %%a /F >nul 2>&1
        )
        echo Port 5000 cleared
    )
)

REM Check port 3000
netstat -ano | findstr :3000 >nul
if %ERRORLEVEL% EQU 0 (
    echo [WARNING] Port 3000 is in use!
    echo.
    echo What's using port 3000:
    netstat -ano | findstr :3000
    echo.
    echo Kill the process? (Y/N)
    set /p kill3000=
    if /i "%kill3000%"=="Y" (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
            taskkill /PID %%a /F >nul 2>&1
        )
        echo Port 3000 cleared
    )
)

echo.
echo ========================================
echo   Starting servers...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop servers
echo.

REM Try to start servers
call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to start servers
    echo.
    echo Try running manually:
    echo   Window 1: cd backend ^&^& npm run dev
    echo   Window 2: cd frontend ^&^& npm run dev
    echo.
    pause
)












