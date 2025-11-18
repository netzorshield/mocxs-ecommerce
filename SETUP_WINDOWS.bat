@echo off
chcp 65001 >nul
echo ========================================
echo   MOCXS E-commerce - Windows Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Choose the LTS version (v18 or higher)
    echo.
    echo After installation, restart your computer and try again.
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version
npm --version
echo.

echo [1/5] Installing root dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install root dependencies
    pause
    exit /b 1
)
echo.

echo [2/5] Installing frontend dependencies...
pushd frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    popd
    pause
    exit /b 1
)
popd
echo.

echo [3/5] Installing backend dependencies...
pushd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    popd
    pause
    exit /b 1
)
popd
echo.

echo [4/5] Creating environment file templates...
if not exist "backend\.env" (
    echo Creating backend\.env.example...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mocxs?retryWrites=true^&w=majority
        echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
        echo RAZORPAY_KEY_ID=your-razorpay-key-id
        echo RAZORPAY_KEY_SECRET=your-razorpay-key-secret
        echo FRONTEND_URL=http://localhost:3000
        echo NODE_ENV=development
    ) > backend\.env.example
    echo Created backend\.env.example
    echo Please copy it to backend\.env and fill in your values
) else (
    echo [OK] backend\.env already exists
)

if not exist "frontend\.env.local" (
    echo Creating frontend\.env.local.example...
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:5000/api
        echo NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
    ) > frontend\.env.local.example
    echo Created frontend\.env.local.example
    echo Please copy it to frontend\.env.local and fill in your values
) else (
    echo [OK] frontend\.env.local already exists
)
echo.

echo [5/5] Setup complete!
echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Configure environment files:
echo    - Edit backend\.env with your MongoDB and Razorpay credentials
echo    - Edit frontend\.env.local with your API URL and Razorpay key
echo.
echo 2. Get MongoDB connection string:
echo    - Sign up at https://www.mongodb.com/cloud/atlas
echo    - Create a free cluster
echo    - Copy connection string to backend\.env
echo.
echo 3. Get Razorpay test keys:
echo    - Sign up at https://razorpay.com/
echo    - Go to Settings ^> API Keys
echo    - Generate test keys
echo    - Add to both .env files
echo.
echo 4. Run the application:
echo    - Double-click RUN_WINDOWS.bat
echo    - Or run: npm run dev
echo.
echo 5. Access the website:
echo    - Frontend: http://localhost:3000
echo    - Backend: http://localhost:5000/api
echo.
echo For detailed instructions, see WINDOWS_SETUP.md
echo.
pause
