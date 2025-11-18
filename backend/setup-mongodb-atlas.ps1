# MongoDB Atlas Setup Helper Script
# This script helps you update your .env file with MongoDB Atlas connection string

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  MongoDB Atlas Setup Helper" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Follow these steps to get your MongoDB Atlas connection string:`n" -ForegroundColor Yellow
Write-Host "1. Go to: https://www.mongodb.com/cloud/atlas" -ForegroundColor White
Write-Host "2. Sign up for a free account (or log in)" -ForegroundColor White
Write-Host "3. Create a free cluster (takes 3-5 minutes)" -ForegroundColor White
Write-Host "4. Click 'Connect' on your cluster" -ForegroundColor White
Write-Host "5. Choose 'Connect your application'" -ForegroundColor White
Write-Host "6. Select 'Node.js' and copy the connection string`n" -ForegroundColor White

Write-Host "Your connection string should look like:" -ForegroundColor Green
Write-Host "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`n" -ForegroundColor Gray

Write-Host "IMPORTANT: Add '/mocxs' before the '?' in the connection string" -ForegroundColor Yellow
Write-Host "Example: mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/mocxs?retryWrites=true&w=majority`n" -ForegroundColor Gray

$connectionString = Read-Host "Paste your MongoDB Atlas connection string here"

if ([string]::IsNullOrWhiteSpace($connectionString)) {
    Write-Host "`n❌ No connection string provided. Exiting." -ForegroundColor Red
    exit 1
}

# Validate connection string format
if (-not $connectionString.StartsWith("mongodb+srv://") -and -not $connectionString.StartsWith("mongodb://")) {
    Write-Host "`n⚠️  Warning: Connection string doesn't look like a valid MongoDB URI" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 1
    }
}

# Check if .env file exists
$envPath = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envPath)) {
    Write-Host "`n❌ .env file not found at: $envPath" -ForegroundColor Red
    Write-Host "Creating new .env file..." -ForegroundColor Yellow
    
    $defaultEnv = @"
PORT=5000
MONGODB_URI=$connectionString
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
"@
    Set-Content -Path $envPath -Value $defaultEnv
    Write-Host "✅ Created new .env file" -ForegroundColor Green
} else {
    # Read existing .env file
    $envContent = Get-Content $envPath
    
    # Update MONGODB_URI line
    $updated = $false
    $newContent = $envContent | ForEach-Object {
        if ($_ -match "^MONGODB_URI=") {
            $updated = $true
            "MONGODB_URI=$connectionString"
        } else {
            $_
        }
    }
    
    # If MONGODB_URI wasn't found, add it
    if (-not $updated) {
        $newContent += "MONGODB_URI=$connectionString"
    }
    
    # Backup original .env file
    $backupPath = "$envPath.backup"
    Copy-Item $envPath $backupPath -Force
    Write-Host "`n✅ Backed up original .env to .env.backup" -ForegroundColor Green
    
    # Write updated content
    Set-Content -Path $envPath -Value $newContent
    Write-Host "✅ Updated MONGODB_URI in .env file" -ForegroundColor Green
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "1. Go to MongoDB Atlas → Network Access" -ForegroundColor White
Write-Host "2. Click 'Add IP Address'" -ForegroundColor White
Write-Host "3. Click 'Allow Access from Anywhere' (adds 0.0.0.0/0)" -ForegroundColor White
Write-Host "4. Click 'Confirm'`n" -ForegroundColor White

Write-Host "Then restart your server:" -ForegroundColor Yellow
Write-Host "  npm run dev`n" -ForegroundColor Gray

Write-Host "✅ Setup complete! Your .env file has been updated." -ForegroundColor Green
Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")



