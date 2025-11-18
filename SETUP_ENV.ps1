# PowerShell script to setup .env file
# Right-click and "Run with PowerShell"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Environment File" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend

if (Test-Path ".env") {
    Write-Host "[WARNING] .env file already exists!" -ForegroundColor Yellow
    Write-Host ""
    $overwrite = Read-Host "Do you want to overwrite it? (Y/N)"
    if ($overwrite -ne "Y" -and $overwrite -ne "y") {
        Write-Host "Cancelled." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 0
    }
}

Write-Host "Creating backend\.env file..." -ForegroundColor Yellow
Write-Host ""

$envContent = @"
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mocxs?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "[OK] Created backend\.env file" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Edit backend\.env file" -ForegroundColor Yellow
Write-Host "2. Replace placeholder values:" -ForegroundColor Yellow
Write-Host "   - MONGODB_URI: Your MongoDB connection string" -ForegroundColor White
Write-Host "   - JWT_SECRET: Any random string (32+ characters)" -ForegroundColor White
Write-Host "   - RAZORPAY_KEY_ID: Your Razorpay key (or dummy value)" -ForegroundColor White
Write-Host "   - RAZORPAY_KEY_SECRET: Your Razorpay secret (or dummy value)" -ForegroundColor White
Write-Host ""
Write-Host "3. Save the file" -ForegroundColor Yellow
Write-Host "4. Restart your server" -ForegroundColor Yellow
Write-Host ""
Write-Host "For Razorpay keys:" -ForegroundColor Cyan
Write-Host "   - Sign up at https://razorpay.com/" -ForegroundColor White
Write-Host "   - Go to Settings > API Keys" -ForegroundColor White
Write-Host "   - Generate test keys" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"












