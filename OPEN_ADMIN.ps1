# PowerShell script to open admin panel
# Right-click and "Run with PowerShell"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Opening MOCXS Admin Panel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening admin panel in browser..." -ForegroundColor Yellow
Start-Process "http://localhost:3000/admin"

Write-Host ""
Write-Host "Admin panel opened!" -ForegroundColor Green
Write-Host ""
Write-Host "If servers are not running, start them first:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"












