# Restart Frontend Server Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Restart Frontend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "$PSScriptRoot\frontend"

Write-Host "[INFO] Stopping any running processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*frontend*" } | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "[INFO] Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "[OK] Cache cleared" -ForegroundColor Green
} else {
    Write-Host "[INFO] No cache to clear" -ForegroundColor Gray
}

Write-Host ""
Write-Host "[INFO] Starting frontend server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Server starting..." -ForegroundColor Cyan
Write-Host "  Wait for 'Compiled successfully'" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm run dev











