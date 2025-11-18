# Troubleshoot Admin Login Issues

## ✅ Verified: Admin Account is Correct

The admin account exists and password "admin123" is correct.

**Admin Credentials:**
- Email: `admin@mocxs.com`
- Password: `admin123`

---

## 🔍 Step-by-Step Troubleshooting

### Step 1: Check if Servers are Running

**Backend Server:**
```powershell
# Should see: "Server running on port 5000"
# Should see: "MongoDB Connected successfully"
cd D:\MOCXS\backend
npm run dev
```

**Frontend Server:**
```powershell
# Should see: "Ready on http://localhost:3000"
cd D:\MOCXS\frontend
npm run dev
```

**Both must be running!**

---

### Step 2: Test Login via API Directly

Open a new PowerShell window and test the login API:

```powershell
# Test login API
$body = @{
    email = "admin@mocxs.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

**Expected response:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@mocxs.com",
    "role": "admin"
  }
}
```

**If this works:** The backend is fine, issue is with frontend.

**If this fails:** Check backend server logs for errors.

---

### Step 3: Check Browser Console

1. Open http://localhost:3000/login
2. Press `F12` to open Developer Tools
3. Go to "Console" tab
4. Try to login
5. Look for any red error messages

**Common errors:**
- `Network Error` → Backend not running
- `CORS Error` → Backend CORS not configured
- `401 Unauthorized` → Token issue
- `400 Bad Request` → Validation error

---

### Step 4: Check Network Tab

1. Open Developer Tools (`F12`)
2. Go to "Network" tab
3. Try to login
4. Look for the `/api/auth/login` request
5. Click on it and check:
   - **Status:** Should be `200` (not 400, 401, 500)
   - **Request Payload:** Should have email and password
   - **Response:** Should have token and user data

---

### Step 5: Clear Browser Cache/Cookies

Sometimes old sessions cause issues:

**Chrome/Edge:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cookies and other site data"
3. Select "Cached images and files"
4. Click "Clear data"
5. Try login again

**Or manually:**
1. Press `F12` → Application tab
2. Click "Cookies" → `http://localhost:3000`
3. Delete all cookies
4. Refresh page and try again

---

### Step 6: Verify Email Format

Make sure you're entering:
- Email: `admin@mocxs.com` (all lowercase, no spaces)
- Password: `admin123` (no spaces, exactly as shown)

**Common mistakes:**
- Extra spaces: ` admin@mocxs.com ` ❌
- Wrong case: `Admin@Mocxs.com` (should work, but try lowercase)
- Typo: `admin@mocs.com` ❌

---

### Step 7: Check Backend Logs

When you try to login, check your backend terminal for:

**Good signs:**
```
POST /api/auth/login 200
```

**Bad signs:**
```
POST /api/auth/login 400
POST /api/auth/login 500
Error: ...
```

---

### Step 8: Verify MongoDB Connection

Make sure MongoDB is connected:

```powershell
# Check MongoDB service
Get-Service MongoDB

# Should show: Running
```

If not running:
```powershell
# Run as Administrator
net start MongoDB
```

---

### Step 9: Test with Different Browser

Try logging in with:
- Chrome
- Edge
- Firefox
- Incognito/Private mode

If it works in one browser but not another, it's a browser cache/cookie issue.

---

### Step 10: Check .env File

Make sure `backend/.env` has:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
```

If `JWT_SECRET` is missing or too short, login will fail.

---

## 🐛 Common Issues & Solutions

### Issue: "Invalid credentials" error

**Possible causes:**
1. Email/password typo
2. Backend not running
3. MongoDB not connected
4. Password hash mismatch

**Solution:**
```powershell
# Reset admin password
cd D:\MOCXS\backend
npm run create-admin
```

### Issue: "Network Error" or "Failed to fetch"

**Possible causes:**
1. Backend server not running
2. Wrong API URL
3. CORS issue

**Solution:**
1. Check backend is running: `npm run dev` in backend folder
2. Check `frontend/.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

### Issue: Login succeeds but no redirect

**Possible causes:**
1. Frontend routing issue
2. Token not being saved

**Solution:**
1. Check browser console for errors
2. Check if token is saved in cookies (F12 → Application → Cookies)

### Issue: "Token is not valid"

**Possible causes:**
1. JWT_SECRET changed
2. Token expired (unlikely, set to 30 days)

**Solution:**
1. Clear cookies and login again
2. Check `JWT_SECRET` in `.env` hasn't changed

---

## ✅ Quick Test Checklist

Run these commands to verify everything:

```powershell
# 1. Check MongoDB
Get-Service MongoDB

# 2. Test admin password
cd D:\MOCXS\backend
node scripts/test-admin-login.js

# 3. Test API directly
$body = @{email="admin@mocxs.com";password="admin123"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

---

## 📞 Still Not Working?

If none of the above works, provide:
1. Browser console errors (F12 → Console)
2. Network tab screenshot of login request
3. Backend terminal output when trying to login
4. What error message you see (exact text)

This will help identify the exact issue.



