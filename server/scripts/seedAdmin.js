const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('../src/models/Admin');
const connectDB = require('../src/config/database');

const createAdmin = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findByEmail('admin@admin.com');
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Email: admin@admin.com');
      console.log('Password: admin123');
      console.log('Role:', existingAdmin.role);
      process.exit(0);
    }

    // Create new admin user
    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@admin.com',
      password: 'admin123',
      role: 'super-admin'
    });

    await admin.save();

    console.log('🎉 Admin user created successfully!');
    console.log('==========================================');
    console.log('Email: admin@admin.com');
    console.log('Password: admin123');
    console.log('Role: super-admin');
    console.log('==========================================');
    console.log('You can now login with these credentials!');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();