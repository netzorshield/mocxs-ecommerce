# Fix: Admin Password Invalid

## 🔧 Quick Fix: Reset Admin Password

If `admin123` is not working, reset the admin account:

### Step 1: Make sure MongoDB is running

```powershell
Get-Service MongoDB
```

If it's not running, start it (as Administrator):
```powershell
net start MongoDB
```

### Step 2: Reset Admin Password

Run this command:

```powershell
cd D:\MOCXS\backend
npm run create-admin
```

This will:
- Create the admin account if it doesn't exist
- Reset the password to `admin123` if it exists

### Step 3: Login

1. Go to: http://localhost:3000/login
2. Use:
   - **Email:** `admin@mocxs.com`
   - **Password:** `admin123`

---

## 🔍 Alternative: Check if Admin Exists

If you want to check if the admin account exists, you can use MongoDB Compass or mongosh:

**Using mongosh:**
```powershell
mongosh
use mocxs
db.users.findOne({ email: "admin@mocxs.com" })
```

**Using MongoDB Compass:**
1. Connect to your MongoDB
2. Navigate to `mocxs` database
3. Open `users` collection
4. Search for `admin@mocxs.com`

---

## 🆕 Create Admin Manually

If the script doesn't work, you can create the admin account manually:

### Option 1: Register and Change Role

1. Go to: http://localhost:3000/register
2. Register with:
   - Email: `admin@mocxs.com`
   - Password: `admin123`
   - Name: `Admin User`
3. After registration, use MongoDB Compass or mongosh to change the role:
   ```javascript
   db.users.updateOne(
     { email: "admin@mocxs.com" },
     { $set: { role: "admin" } }
   )
   ```

### Option 2: Use MongoDB Compass

1. Open MongoDB Compass
2. Connect to your database
3. Go to `mocxs` database → `users` collection
4. Click "Add Data" → "Insert Document"
5. Insert:
   ```json
   {
     "name": "Admin User",
     "email": "admin@mocxs.com",
     "password": "$2a$10$rOzJqJqJqJqJqJqJqJqJqO",  // This is a hash - see below
     "role": "admin",
     "createdAt": new Date()
   }
   ```

**Note:** The password hash above is just an example. The easiest way is to use the script or register normally and change the role.

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"

- Make sure MongoDB is running: `Get-Service MongoDB`
- Check your `.env` file has correct `MONGODB_URI`
- See `FIX_MONGODB_CONNECTION.md` for help

### Error: "User already exists"

- The script will update the existing user's password
- If you still can't login, the password might be hashed incorrectly
- Try deleting the user first, then run the script again

### Still Can't Login?

1. **Check the email** - Make sure you're using: `admin@mocxs.com` (all lowercase)
2. **Check the password** - Make sure you're using: `admin123` (no spaces)
3. **Clear browser cache** - Sometimes old sessions cause issues
4. **Check server logs** - Look for error messages in your backend terminal

---

## ✅ Verify Admin Account

After running the script, verify it worked:

```powershell
mongosh
use mocxs
db.users.findOne({ email: "admin@mocxs.com" }, { password: 0 })
```

You should see:
```json
{
  _id: ObjectId("..."),
  name: "Admin User",
  email: "admin@mocxs.com",
  role: "admin",
  ...
}
```

The `role` should be `"admin"`.

---

## 📝 Summary

**Quickest Solution:**
```powershell
cd D:\MOCXS\backend
npm run create-admin
```

Then login with:
- Email: `admin@mocxs.com`
- Password: `admin123`



