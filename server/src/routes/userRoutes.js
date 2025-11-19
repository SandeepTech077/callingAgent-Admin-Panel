const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserStats
} = require('../controllers/userController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth);

// GET /api/users/stats - Get user statistics
router.get('/stats', getUserStats);

// Debug route to test if routes are working (without auth)
router.get('/debug', (req, res) => {
  res.json({
    success: true,
    message: 'User routes are working!',
    timestamp: new Date().toISOString(),
    route: 'GET /api/users/debug'
  });
});

// Test route for getting user by ID without auth middleware
router.get('/test/:id', async (req, res) => {
  try {
    console.log('Test route - Getting user with ID:', req.params.id);
    const User = require('../models/User');
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found in test route'
      });
    }

    res.json({
      success: true,
      message: 'User retrieved successfully via test route',
      data: user
    });
  } catch (error) {
    console.error('Test route error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in test route',
      error: error.message
    });
  }
});

// GET /api/users - Get all users with pagination and filters
router.get('/', getUsers);

module.exports = router;