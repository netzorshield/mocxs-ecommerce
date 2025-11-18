@echo off
chcp 65001 >nul
echo ========================================
echo   MOCXS E-commerce - Windows Launcher
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Choose the LTS version (v18 or higher)
    echo.
    echo After installation, restart your computer and try again.
    pause
    exit /b 1
)

echo [1/4] Checking Node.js installation...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not working properly
    pause
    exit /b 1
)

npm --version
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not working properly
    pause
    exit /b 1
)
echo.

echo [2/4] Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing root dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install root dependencies
        pause
        exit /b 1
    )
)

if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    pushd frontend
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install frontend dependencies
        popd
        pause
        exit /b 1
    )
    popd
)

if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    pushd backend
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install backend dependencies
        popd
        pause
        exit /b 1
    )
    popd
)
echo.

echo [3/4] Checking environment files...
if not exist "backend\.env" (
    echo [WARNING] backend\.env file not found!
    echo Please create backend\.env file with your configuration.
    echo See WINDOWS_SETUP.md for details.
    echo.
    echo Press any key to continue anyway or Ctrl+C to exit...
    pause >nul
)

if not exist "frontend\.env.local" (
    echo [WARNING] frontend\.env.local file not found!
    echo Please create frontend\.env.local file with your configuration.
    echo See WINDOWS_SETUP.md for details.
    echo.
    echo Press any key to continue anyway or Ctrl+C to exit...
    pause >nul
)
echo.

echo [4/4] Starting servers...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start both servers using concurrently
call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to start servers
    echo.
    echo Try running manually:
    echo   Terminal 1: cd backend ^&^& npm run dev
    echo   Terminal 2: cd frontend ^&^& npm run dev
    echo.
    pause
)
