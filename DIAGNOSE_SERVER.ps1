# Server Diagnostic Script
# Run this to check what's wrong

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MOCXS Server Diagnostic Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()

# Check 1: Node.js
Write-Host "[1/10] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "  [OK] Node.js: $nodeVersion" -ForegroundColor Green
    } else {
        throw "Not found"
    }
} catch {
    Write-Host "  [ERROR] Node.js not installed!" -ForegroundColor Red
    Write-Host "  Install from: https://nodejs.org/" -ForegroundColor Yellow
    $errors += "Node.js not installed"
}

# Check 2: npm
Write-Host "[2/10] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "  [OK] npm: $npmVersion" -ForegroundColor Green
    } else {
        throw "Not found"
    }
} catch {
    Write-Host "  [ERROR] npm not found!" -ForegroundColor Red
    $errors += "npm not found"
}

# Check 3: Current directory
Write-Host "[3/10] Checking current directory..." -ForegroundColor Yellow
$currentDir = Get-Location
Write-Host "  Current: $currentDir" -ForegroundColor Cyan
if ($currentDir -notlike "*MOCXS*") {
    Write-Host "  [WARNING] Not in MOCXS folder!" -ForegroundColor Yellow
    Write-Host "  Run: cd D:\MOCXS" -ForegroundColor Yellow
    $warnings += "Not in project directory"
}

# Check 4: Root node_modules
Write-Host "[4/10] Checking root dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  [OK] Root dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] Root dependencies not installed" -ForegroundColor Yellow
    Write-Host "  Run: npm install" -ForegroundColor Yellow
    $warnings += "Root dependencies missing"
}

# Check 5: Frontend node_modules
Write-Host "[5/10] Checking frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "frontend\node_modules") {
    Write-Host "  [OK] Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] Frontend dependencies not installed" -ForegroundColor Yellow
    Write-Host "  Run: cd frontend && npm install" -ForegroundColor Yellow
    $warnings += "Frontend dependencies missing"
}

# Check 6: Backend node_modules
Write-Host "[6/10] Checking backend dependencies..." -ForegroundColor Yellow
if (Test-Path "backend\node_modules") {
    Write-Host "  [OK] Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] Backend dependencies not installed" -ForegroundColor Yellow
    Write-Host "  Run: cd backend && npm install" -ForegroundColor Yellow
    $warnings += "Backend dependencies missing"
}

# Check 7: Backend .env
Write-Host "[7/10] Checking backend environment file..." -ForegroundColor Yellow
if (Test-Path "backend\.env") {
    Write-Host "  [OK] backend\.env exists" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] backend\.env not found" -ForegroundColor Yellow
    Write-Host "  Create backend\.env file (see WINDOWS_SETUP.md)" -ForegroundColor Yellow
    $warnings += "Backend .env missing"
}

# Check 8: Frontend .env.local
Write-Host "[8/10] Checking frontend environment file..." -ForegroundColor Yellow
if (Test-Path "frontend\.env.local") {
    Write-Host "  [OK] frontend\.env.local exists" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] frontend\.env.local not found" -ForegroundColor Yellow
    Write-Host "  Create frontend\.env.local file (see WINDOWS_SETUP.md)" -ForegroundColor Yellow
    $warnings += "Frontend .env.local missing"
}

# Check 9: Port 5000
Write-Host "[9/10] Checking port 5000..." -ForegroundColor Yellow
$port5000 = netstat -ano | findstr :5000
if ($port5000) {
    Write-Host "  [WARNING] Port 5000 is in use!" -ForegroundColor Yellow
    Write-Host "  $port5000" -ForegroundColor Cyan
    Write-Host "  Kill process or change PORT in backend\.env" -ForegroundColor Yellow
    $warnings += "Port 5000 in use"
} else {
    Write-Host "  [OK] Port 5000 is available" -ForegroundColor Green
}

# Check 10: Port 3000
Write-Host "[10/10] Checking port 3000..." -ForegroundColor Yellow
$port3000 = netstat -ano | findstr :3000
if ($port3000) {
    Write-Host "  [WARNING] Port 3000 is in use!" -ForegroundColor Yellow
    Write-Host "  $port3000" -ForegroundColor Cyan
    Write-Host "  Kill process or change port" -ForegroundColor Yellow
    $warnings += "Port 3000 in use"
} else {
    Write-Host "  [OK] Port 3000 is available" -ForegroundColor Green
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Diagnostic Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "[SUCCESS] Everything looks good!" -ForegroundColor Green
    Write-Host "Try running: npm run dev" -ForegroundColor Cyan
} else {
    if ($errors.Count -gt 0) {
        Write-Host "[ERRORS FOUND] $($errors.Count) critical issue(s):" -ForegroundColor Red
        foreach ($error in $errors) {
            Write-Host "  - $error" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "[WARNINGS] $($warnings.Count) warning(s):" -ForegroundColor Yellow
        foreach ($warning in $warnings) {
            Write-Host "  - $warning" -ForegroundColor Yellow
        }
        Write-Host ""
    }
    
    Write-Host "Fix the issues above, then try again." -ForegroundColor Cyan
}

Write-Host ""
Write-Host "For detailed help, see TROUBLESHOOT_SERVER.md" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"












