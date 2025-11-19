# Razorpay Indian Test Cards - Quick Reference

## ⚠️ Important Notice

**Razorpay Test Mode ONLY accepts INDIAN card numbers!**

If you see the error: *"International cards are not supported. Please contact our support team for help"*

This means you're using a non-Indian card number. Use the Indian test cards below instead.

---

## ✅ Working Indian Test Cards

### Indian Visa Card (Recommended)
- **Card Number**: `5267 3181 8797 5449`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name
- **Result**: ✅ Payment succeeds

### Indian Mastercard
- **Card Number**: `5104 0600 0000 0008`
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **Result**: ✅ Payment succeeds

---

## ❌ Cards That DON'T Work

### International Cards (Rejected)
- `4111 1111 1111 1111` ❌ - Shows "International cards are not supported"
- `5555 5555 5555 4444` ❌ - International card
- Any card starting with `4` that's not Indian ❌

---

## 🧪 Test Scenarios

### Test Successful Payment
Use: `5267 3181 8797 5449`
- Payment will complete successfully
- Order will be created
- You'll be redirected to orders page

### Test Failed Payment
Use: `4000 0000 0000 0002`
- Payment will fail
- Error message will be shown
- Order will remain pending

### Test Insufficient Funds
Use: `4000 0000 0000 9995`
- Payment will fail with insufficient funds error

---

## 💡 Quick Tips

1. **Always use Indian card numbers** in Razorpay test mode
2. **Card number `5267 3181 8797 5449`** is the most reliable for testing
3. **Any expiry date in the future** works (e.g., 12/25, 01/26)
4. **Any 3-digit CVV** works (e.g., 123, 456, 789)
5. **Any name** works for the cardholder

---

## 🔍 If Payment Still Fails

1. **Check you're using Indian card**: `5267 3181 8797 5449`
2. **Verify Razorpay is in Test Mode**: Check your Razorpay dashboard
3. **Check backend logs**: Look for any Razorpay errors
4. **Clear browser cache**: Sometimes cached data causes issues
5. **Try UPI instead**: Razorpay also supports UPI in test mode

---

## 📞 Need Help?

If you're still getting errors:
- Check `TEST_RAZORPAY.md` for complete testing guide
- Check `RAZORPAY_SETUP.md` for setup instructions
- Verify your Razorpay keys are correct in `backend/.env`

