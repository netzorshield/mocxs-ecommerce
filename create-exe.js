// Node.js script to create an EXE launcher
// Run: node create-exe.js

const fs = require('fs');
const path = require('path');

const batchContent = `@echo off
title MOCXS E-commerce - Auto Start
color 0A
chcp 65001 >nul

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
if not exist "node_modules\\" (
    echo Installing dependencies... Please wait...
    call npm install >nul 2>&1
)

if not exist "frontend\\node_modules\\" (
    echo Installing frontend dependencies...
    pushd frontend
    call npm install >nul 2>&1
    popd
)

if not exist "backend\\node_modules\\" (
    echo Installing backend dependencies...
    pushd backend
    call npm install >nul 2>&1
    popd
)

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
`;

// Write the batch file
fs.writeFileSync('START_MOCXS.bat', batchContent);
console.log('✅ Created START_MOCXS.bat');
console.log('');
console.log('To convert to EXE:');
console.log('1. Download Bat To Exe Converter: https://www.battoexeconverter.com/');
console.log('2. Open START_MOCXS.bat in the converter');
console.log('3. Set options:');
console.log('   - Visibility: Hidden (optional)');
console.log('   - Icon: (optional)');
console.log('4. Click "Compile"');
console.log('');
console.log('Or use online converter: https://www.battoexeconverter.com/online/');












