# PowerShell script for Windows 11
# Right-click and select "Run with PowerShell" or run: powershell -ExecutionPolicy Bypass -File RUN_WINDOWS.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MOCXS E-commerce - Windows Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>$null
    $npmVersion = npm --version 2>$null
    if (-not $nodeVersion -or -not $npmVersion) {
        throw "Node.js or npm not found"
    }
    Write-Host "[OK] Node.js found: $nodeVersion" -ForegroundColor Green
    Write-Host "[OK] npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Choose the LTS version (v18 or higher)" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[1/4] Checking if dependencies are installed..." -ForegroundColor Cyan

# Check and install root dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing root dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install root dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Check and install frontend dependencies
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install frontend dependencies" -ForegroundColor Red
        Set-Location ..
        Read-Host "Press Enter to exit"
        exit 1
    }
    Set-Location ..
}

# Check and install backend dependencies
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install backend dependencies" -ForegroundColor Red
        Set-Location ..
        Read-Host "Press Enter to exit"
        exit 1
    }
    Set-Location ..
}

Write-Host ""
Write-Host "[2/4] Checking environment files..." -ForegroundColor Cyan

if (-not (Test-Path "backend\.env")) {
    Write-Host "[WARNING] backend\.env file not found!" -ForegroundColor Yellow
    Write-Host "Please create backend\.env file with your configuration." -ForegroundColor Yellow
    Write-Host "See WINDOWS_SETUP.md for details." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue anyway"
}

if (-not (Test-Path "frontend\.env.local")) {
    Write-Host "[WARNING] frontend\.env.local file not found!" -ForegroundColor Yellow
    Write-Host "Please create frontend\.env.local file with your configuration." -ForegroundColor Yellow
    Write-Host "See WINDOWS_SETUP.md for details." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue anyway"
}

Write-Host ""
Write-Host "[3/4] Starting servers..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend will run on: http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend will run on: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start both servers
npm run dev

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] Failed to start servers" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try running manually:" -ForegroundColor Yellow
    Write-Host "  Terminal 1: cd backend; npm run dev" -ForegroundColor Yellow
    Write-Host "  Terminal 2: cd frontend; npm run dev" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
}



