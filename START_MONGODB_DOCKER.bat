@echo off
echo ========================================
echo   Starting MongoDB with Docker
echo ========================================
echo.

REM Check if Docker is running
docker ps >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker Desktop is not running!
    echo.
    echo Please:
    echo 1. Start Docker Desktop
    echo 2. Wait for it to fully start
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)

REM Check if MongoDB container already exists
docker ps -a --filter "name=mongodb" --format "{{.Names}}" | findstr /C:"mongodb" >nul
if errorlevel 1 (
    echo Creating and starting MongoDB container...
    docker run -d -p 27017:27017 --name mongodb mongo:latest
) else (
    echo MongoDB container already exists. Starting it...
    docker start mongodb
)

echo.
echo [OK] MongoDB is running on localhost:27017
echo.
echo To stop MongoDB:
echo   docker stop mongodb
echo.
echo To start MongoDB again:
echo   docker start mongodb
echo.
pause











