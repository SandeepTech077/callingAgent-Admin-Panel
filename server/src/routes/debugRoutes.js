const express = require('express');
const router = express.Router();

// Test endpoint without authentication
router.get('/test-connection', (req, res) => {
  res.json({
    success: true,
    message: 'API connection is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test users endpoint
router.get('/test-users', async (req, res) => {
  try {
    const User = require('../models/User');
    const userCount = await User.countDocuments();
    
    res.json({
      success: true,
      message: 'Database connection is working!',
      userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;