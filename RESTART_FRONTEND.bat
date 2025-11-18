@echo off
chcp 65001 >nul
echo ========================================
echo   Restart Frontend Server
echo ========================================
echo.

cd /d "%~dp0\frontend"

echo [INFO] Stopping any running processes...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq *frontend*" >nul 2>&1

echo [INFO] Clearing Next.js cache...
if exist ".next" (
    rmdir /s /q .next
    echo [OK] Cache cleared
) else (
    echo [INFO] No cache to clear
)

echo.
echo [INFO] Starting frontend server...
echo.
echo ========================================
echo   Server starting...
echo   Wait for "Compiled successfully"
echo ========================================
echo.

npm run dev

pause











