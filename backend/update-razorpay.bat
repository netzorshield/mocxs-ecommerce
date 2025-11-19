@echo off
echo ========================================
echo   Razorpay Credentials Setup
echo ========================================
echo.

if not exist .env (
    echo Error: .env file not found!
    echo Make sure you're running this from the backend folder.
    pause
    exit /b 1
)

echo Current .env file found.
echo.
echo Please provide your Razorpay test credentials:
echo.

set /p KEY_ID="Enter Razorpay Key ID (rzp_test_...): "
set /p KEY_SECRET="Enter Razorpay Key Secret: "

if "%KEY_ID%"=="" (
    echo Error: Key ID cannot be empty!
    pause
    exit /b 1
)

if "%KEY_SECRET%"=="" (
    echo Error: Key Secret cannot be empty!
    pause
    exit /b 1
)

echo.
echo Updating .env file...

powershell -Command "(Get-Content .env) -replace 'RAZORPAY_KEY_ID=.*', 'RAZORPAY_KEY_ID=%KEY_ID%' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'RAZORPAY_KEY_SECRET=.*', 'RAZORPAY_KEY_SECRET=%KEY_SECRET%' | Set-Content .env"

echo.
echo ========================================
echo   Razorpay credentials updated!
echo ========================================
echo.
echo Next Steps:
echo   1. Restart your backend server
echo   2. Test payment on checkout page
echo.
echo Test Card: 4111 1111 1111 1111
echo.
pause

