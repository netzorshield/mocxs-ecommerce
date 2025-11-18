# PowerShell script for Windows 11
# Right-click and select "Run with PowerShell" or run: powershell -ExecutionPolicy Bypass -File SETUP_WINDOWS.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MOCXS E-commerce - Windows Setup" -ForegroundColor Cyan
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
    Write-Host "[ERROR] Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Choose the LTS version (v18 or higher)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After installation, restart your computer and try again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[1/5] Installing root dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to install root dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[2/5] Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to install frontend dependencies" -ForegroundColor Red
    Set-Location ..
    Read-Host "Press Enter to exit"
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "[3/5] Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to install backend dependencies" -ForegroundColor Red
    Set-Location ..
    Read-Host "Press Enter to exit"
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "[4/5] Creating environment file templates..." -ForegroundColor Cyan

if (-not (Test-Path "backend\.env")) {
    Write-Host "Creating backend\.env.example..." -ForegroundColor Yellow
    @"
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mocxs?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
"@ | Out-File -FilePath "backend\.env.example" -Encoding UTF8
    Write-Host "Created backend\.env.example" -ForegroundColor Green
    Write-Host "Please copy it to backend\.env and fill in your values" -ForegroundColor Yellow
} else {
    Write-Host "[OK] backend\.env already exists" -ForegroundColor Green
}

if (-not (Test-Path "frontend\.env.local")) {
    Write-Host "Creating frontend\.env.local.example..." -ForegroundColor Yellow
    @"
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
"@ | Out-File -FilePath "frontend\.env.local.example" -Encoding UTF8
    Write-Host "Created frontend\.env.local.example" -ForegroundColor Green
    Write-Host "Please copy it to frontend\.env.local and fill in your values" -ForegroundColor Yellow
} else {
    Write-Host "[OK] frontend\.env.local already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "[5/5] Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Configure environment files:" -ForegroundColor Yellow
Write-Host "   - Edit backend\.env with your MongoDB and Razorpay credentials" -ForegroundColor White
Write-Host "   - Edit frontend\.env.local with your API URL and Razorpay key" -ForegroundColor White
Write-Host ""
Write-Host "2. Get MongoDB connection string:" -ForegroundColor Yellow
Write-Host "   - Sign up at https://www.mongodb.com/cloud/atlas" -ForegroundColor White
Write-Host "   - Create a free cluster" -ForegroundColor White
Write-Host "   - Copy connection string to backend\.env" -ForegroundColor White
Write-Host ""
Write-Host "3. Get Razorpay test keys:" -ForegroundColor Yellow
Write-Host "   - Sign up at https://razorpay.com/" -ForegroundColor White
Write-Host "   - Go to Settings > API Keys" -ForegroundColor White
Write-Host "   - Generate test keys" -ForegroundColor White
Write-Host "   - Add to both .env files" -ForegroundColor White
Write-Host ""
Write-Host "4. Run the application:" -ForegroundColor Yellow
Write-Host "   - Double-click RUN_WINDOWS.bat or RUN_WINDOWS.ps1" -ForegroundColor White
Write-Host "   - Or run: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "5. Access the website:" -ForegroundColor Yellow
Write-Host "   - Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   - Backend: http://localhost:5000/api" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see WINDOWS_SETUP.md" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"



