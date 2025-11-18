const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mocxs');
    console.log('Connected to MongoDB');

    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@mocxs.com' });
    
    if (adminExists) {
      // Update existing admin password
      // Delete and recreate to ensure password is properly hashed
      await User.deleteOne({ email: 'admin@mocxs.com' });
      console.log('Removed existing admin account');
    }
    
    // Create new admin (or recreate if it existed)
    const admin = new User({
      name: 'Admin User',
      email: 'admin@mocxs.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    
    if (adminExists) {
      console.log('✅ Admin password reset successfully!');
    } else {
      console.log('✅ Admin account created successfully!');
    }
    console.log('   Email: admin@mocxs.com');
    console.log('   Password: admin123');

    console.log('\nYou can now login at: http://localhost:3000/login');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();

