# Quick Razorpay Setup - 3 Easy Steps

## Step 1: Get Your Test Credentials

You should have received from Razorpay:
- **Key ID**: Something like `rzp_test_1234567890ABCDEF`
- **Key Secret**: A long secret string

## Step 2: Update the .env File

### Option A: Use the Batch Script (Easiest)

1. Open PowerShell or Command Prompt
2. Navigate to backend folder:
   ```powershell
   cd b:\MOCXS\backend
   ```
3. Run the batch file:
   ```powershell
   .\update-razorpay.bat
   ```
4. Enter your Key ID when prompted
5. Enter your Key Secret when prompted
6. Done! ✅

### Option B: Manual Update

1. Open `b:\MOCXS\backend\.env` in a text editor (Notepad, VS Code, etc.)
2. Find these two lines:
   ```
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   ```
3. Replace with your actual credentials:
   ```
   RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID
   RAZORPAY_KEY_SECRET=YOUR_ACTUAL_KEY_SECRET
   ```
4. Save the file

## Step 3: Restart Backend Server

1. Stop your backend server (Ctrl+C)
2. Start it again:
   ```powershell
   cd b:\MOCXS\backend
   npm run dev
   ```

## ✅ Test It!

1. Go to your website checkout page
2. Select "Online Payment"
3. Click "Place Order"
4. Razorpay popup appears
5. **Use INDIAN test card** (Razorpay only accepts Indian cards):
   - **Card Number**: `5267 3181 8797 5449` (Indian Visa)
   - **Expiry**: Any future date (e.g., 12/25)
   - **CVV**: Any 3 digits (e.g., 123)
   
   ⚠️ **Don't use `4111 1111 1111 1111`** - it's an international card and will be rejected!

## 🎉 That's It!

Your Razorpay integration is now ready to use!

---

**Need help?** Check `RAZORPAY_SETUP.md` for detailed information.

