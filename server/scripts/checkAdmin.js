const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('../src/models/Admin');
const connectDB = require('../src/config/database');

const checkAdmin = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();

    const admins = await Admin.find({}).select('-password -refreshToken');
    
    if (admins.length === 0) {
      console.log('❌ No admin users found.');
      console.log('Run: npm run seed');
    } else {
      console.log('✅ Admin users found:');
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.name} (${admin.email}) - ${admin.role}`);
      });
      console.log('\nLogin credentials:');
      console.log('Email: admin@admin.com');
      console.log('Password: admin123');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
};

checkAdmin();