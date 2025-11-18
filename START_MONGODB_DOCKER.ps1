# Start MongoDB with Docker
# This script checks if Docker is running and starts MongoDB container

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting MongoDB with Docker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    docker ps | Out-Null
    Write-Host "[OK] Docker Desktop is running" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Docker Desktop is not running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Start Docker Desktop" -ForegroundColor Yellow
    Write-Host "2. Wait for it to fully start" -ForegroundColor Yellow
    Write-Host "3. Run this script again" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if MongoDB container already exists
$containerExists = docker ps -a --filter "name=mongodb" --format "{{.Names}}" | Select-String "mongodb"

if ($containerExists) {
    Write-Host "[INFO] MongoDB container already exists" -ForegroundColor Yellow
    
    # Check if container is running
    $isRunning = docker ps --filter "name=mongodb" --format "{{.Names}}" | Select-String "mongodb"
    
    if ($isRunning) {
        Write-Host "[OK] MongoDB is already running" -ForegroundColor Green
    } else {
        Write-Host "[INFO] Starting MongoDB container..." -ForegroundColor Yellow
        docker start mongodb
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] MongoDB started successfully" -ForegroundColor Green
        } else {
            Write-Host "[ERROR] Failed to start MongoDB container" -ForegroundColor Red
            Read-Host "Press Enter to exit"
            exit 1
        }
    }
} else {
    Write-Host "[INFO] Creating and starting MongoDB container..." -ForegroundColor Yellow
    docker run -d -p 27017:27017 --name mongodb mongo:latest
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] MongoDB container created and started" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Failed to create MongoDB container" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "[OK] MongoDB is running on localhost:27017" -ForegroundColor Green
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Cyan
Write-Host "  Stop MongoDB:    docker stop mongodb" -ForegroundColor Gray
Write-Host "  Start MongoDB:   docker start mongodb" -ForegroundColor Gray
Write-Host "  View logs:       docker logs mongodb" -ForegroundColor Gray
Write-Host ""
Write-Host "Now you can run:" -ForegroundColor Yellow
Write-Host "  cd D:\MOCXS\backend" -ForegroundColor Gray
Write-Host "  npm run seed" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to exit"











