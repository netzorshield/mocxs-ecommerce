# PowerShell Script to Update Razorpay Credentials in .env file

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Razorpay Credentials Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$envFile = ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "❌ Error: .env file not found in current directory!" -ForegroundColor Red
    Write-Host "   Make sure you're running this from the backend folder." -ForegroundColor Yellow
    exit 1
}

Write-Host "📝 Current .env file found." -ForegroundColor Green
Write-Host ""

# Read current .env content
$envContent = Get-Content $envFile -Raw

# Prompt for Key ID
Write-Host 'Enter your Razorpay Key ID (starts with rzp_test_...):' -ForegroundColor Yellow
$keyId = Read-Host "Key ID"

if ([string]::IsNullOrWhiteSpace($keyId)) {
    Write-Host "❌ Key ID cannot be empty!" -ForegroundColor Red
    exit 1
}

# Prompt for Key Secret
Write-Host ""
Write-Host "Enter your Razorpay Key Secret:" -ForegroundColor Yellow
$keySecret = Read-Host "Key Secret"

if ([string]::IsNullOrWhiteSpace($keySecret)) {
    Write-Host "❌ Key Secret cannot be empty!" -ForegroundColor Red
    exit 1
}

# Update RAZORPAY_KEY_ID
if ($envContent -match "RAZORPAY_KEY_ID=.*") {
    $envContent = $envContent -replace "RAZORPAY_KEY_ID=.*", "RAZORPAY_KEY_ID=$keyId"
    Write-Host "✅ Updated RAZORPAY_KEY_ID" -ForegroundColor Green
} else {
    # Add if not exists
    $envContent += "`nRAZORPAY_KEY_ID=$keyId"
    Write-Host "✅ Added RAZORPAY_KEY_ID" -ForegroundColor Green
}

# Update RAZORPAY_KEY_SECRET
if ($envContent -match "RAZORPAY_KEY_SECRET=.*") {
    $envContent = $envContent -replace "RAZORPAY_KEY_SECRET=.*", "RAZORPAY_KEY_SECRET=$keySecret"
    Write-Host "✅ Updated RAZORPAY_KEY_SECRET" -ForegroundColor Green
} else {
    # Add if not exists
    $envContent += "`nRAZORPAY_KEY_SECRET=$keySecret"
    Write-Host "✅ Added RAZORPAY_KEY_SECRET" -ForegroundColor Green
}

# Write back to file
$envContent | Set-Content $envFile -NoNewline

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Razorpay credentials updated successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Restart your backend server" -ForegroundColor White
Write-Host "   2. Test payment on checkout page" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Test Card: 4111 1111 1111 1111" -ForegroundColor Cyan
Write-Host ""

