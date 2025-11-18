const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

async function testAdminLogin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mocxs');
    console.log('Connected to MongoDB\n');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@mocxs.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('   Run: npm run create-admin');
      process.exit(1);
    }

    console.log('✅ Admin user found:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Password hash: ${admin.password.substring(0, 20)}...`);
    console.log('');

    // Test password
    console.log('Testing password "admin123"...');
    const isMatch = await admin.comparePassword('admin123');
    
    if (isMatch) {
      console.log('✅ Password "admin123" is CORRECT!');
      console.log('');
      console.log('The admin account should work. If login still fails:');
      console.log('1. Make sure backend server is running: npm run dev');
      console.log('2. Make sure frontend server is running: cd ../frontend && npm run dev');
      console.log('3. Check browser console for errors');
      console.log('4. Try clearing browser cache/cookies');
    } else {
      console.log('❌ Password "admin123" is INCORRECT!');
      console.log('');
      console.log('The password hash doesn\'t match. Resetting...');
      
      // Delete and recreate
      await User.deleteOne({ email: 'admin@mocxs.com' });
      const newAdmin = new User({
        name: 'Admin User',
        email: 'admin@mocxs.com',
        password: 'admin123',
        role: 'admin'
      });
      await newAdmin.save();
      console.log('✅ Admin account recreated with password "admin123"');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testAdminLogin();



