# MongoDB Local Installation Checker
# This script checks if MongoDB is installed and running locally

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  MongoDB Local Installation Checker" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$issues = @()
$warnings = @()

# Check 1: MongoDB Service
Write-Host "Checking MongoDB Service..." -ForegroundColor Yellow
$mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue

if ($null -eq $mongoService) {
    $issues += "MongoDB service not found. MongoDB may not be installed."
    Write-Host "  ❌ MongoDB service not found" -ForegroundColor Red
} else {
    if ($mongoService.Status -eq "Running") {
        Write-Host "  ✅ MongoDB service is running" -ForegroundColor Green
    } else {
        $issues += "MongoDB service exists but is not running."
        Write-Host "  ⚠️  MongoDB service is stopped" -ForegroundColor Yellow
        Write-Host "     Start it with: net start MongoDB" -ForegroundColor Gray
    }
}

# Check 2: MongoDB Installation Path
Write-Host "`nChecking MongoDB Installation..." -ForegroundColor Yellow
$mongoPath = "C:\Program Files\MongoDB"
if (Test-Path $mongoPath) {
    Write-Host "  ✅ MongoDB found at: $mongoPath" -ForegroundColor Green
    
    # Find mongod.exe
    $mongodPath = Get-ChildItem -Path $mongoPath -Recurse -Filter "mongod.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($mongodPath) {
        Write-Host "  ✅ MongoDB executable found" -ForegroundColor Green
    } else {
        $warnings += "MongoDB executable not found in expected location"
        Write-Host "  ⚠️  MongoDB executable not found" -ForegroundColor Yellow
    }
} else {
    $issues += "MongoDB installation directory not found."
    Write-Host "  ❌ MongoDB not installed" -ForegroundColor Red
}

# Check 3: Port 27017
Write-Host "`nChecking Port 27017..." -ForegroundColor Yellow
$portCheck = netstat -ano | findstr ":27017"
if ($portCheck) {
    Write-Host "  ✅ Port 27017 is in use (MongoDB likely running)" -ForegroundColor Green
} else {
    $warnings += "Port 27017 is not in use. MongoDB may not be running."
    Write-Host "  ⚠️  Port 27017 is not in use" -ForegroundColor Yellow
}

# Check 4: mongosh Command
Write-Host "`nChecking MongoDB Shell (mongosh)..." -ForegroundColor Yellow
$mongoshCmd = Get-Command mongosh -ErrorAction SilentlyContinue
if ($mongoshCmd) {
    Write-Host "  ✅ mongosh command available" -ForegroundColor Green
} else {
    $warnings += "mongosh command not found in PATH"
    Write-Host "  ⚠️  mongosh not in PATH (may still work with full path)" -ForegroundColor Yellow
}

# Check 5: .env File Configuration
Write-Host "`nChecking .env Configuration..." -ForegroundColor Yellow
$envPath = Join-Path $PSScriptRoot ".env"
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath
    $mongoUri = $envContent | Select-String "MONGODB_URI="
    
    if ($mongoUri) {
        if ($mongoUri -match "localhost:27017" -or $mongoUri -match "127.0.0.1:27017") {
            Write-Host "  ✅ .env configured for local MongoDB" -ForegroundColor Green
        } else {
            $warnings += ".env is configured for MongoDB Atlas, not local MongoDB"
            Write-Host "  ⚠️  .env configured for MongoDB Atlas (not local)" -ForegroundColor Yellow
        }
    } else {
        $issues += "MONGODB_URI not found in .env file"
        Write-Host "  ❌ MONGODB_URI not found in .env" -ForegroundColor Red
    }
} else {
    $issues += ".env file not found"
    Write-Host "  ❌ .env file not found" -ForegroundColor Red
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Summary" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($issues.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host ""
    Write-Host "Everything looks good! MongoDB should be working." -ForegroundColor Green
    Write-Host ""
    Write-Host "Try running your server:" -ForegroundColor Yellow
    Write-Host "  npm run dev" -ForegroundColor Gray
    Write-Host ""
} elseif ($issues.Count -eq 0) {
    Write-Host ""
    Write-Host "Some warnings found, but MongoDB should work:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  - $warning" -ForegroundColor Yellow
    }
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Issues found that need to be fixed:" -ForegroundColor Red
    foreach ($issue in $issues) {
        Write-Host "  - $issue" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Install MongoDB: See INSTALL_MONGODB_LOCAL.md" -ForegroundColor White
    Write-Host "  2. Start MongoDB service: net start MongoDB" -ForegroundColor White
    Write-Host "  3. Verify: Get-Service MongoDB" -ForegroundColor White
    Write-Host ""
}

# Script complete

