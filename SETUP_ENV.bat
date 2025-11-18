@echo off
chcp 65001 >nul
echo ========================================
echo   Setup Environment File
echo ========================================
echo.

cd /d "%~dp0\backend"

if exist ".env" (
    echo [WARNING] .env file already exists!
    echo.
    echo Do you want to overwrite it? (Y/N)
    set /p overwrite=
    if /i not "%overwrite%"=="Y" (
        echo Cancelled.
        pause
        exit /b 0
    )
)

echo Creating backend\.env file...
echo.

(
    echo PORT=5000
    echo MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mocxs?retryWrites=true^&w=majority
    echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
    echo RAZORPAY_KEY_ID=your-razorpay-key-id
    echo RAZORPAY_KEY_SECRET=your-razorpay-key-secret
    echo FRONTEND_URL=http://localhost:3000
    echo NODE_ENV=development
) > .env

echo [OK] Created backend\.env file
echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Edit backend\.env file
echo 2. Replace placeholder values:
echo    - MONGODB_URI: Your MongoDB connection string
echo    - JWT_SECRET: Any random string (32+ characters)
echo    - RAZORPAY_KEY_ID: Your Razorpay key (or dummy value)
echo    - RAZORPAY_KEY_SECRET: Your Razorpay secret (or dummy value)
echo.
echo 3. Save the file
echo 4. Restart your server
echo.
echo For Razorpay keys:
echo   - Sign up at https://razorpay.com/
echo   - Go to Settings ^> API Keys
echo   - Generate test keys
echo.
pause












