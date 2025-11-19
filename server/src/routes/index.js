const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const debugRoutes = require('./debugRoutes');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
router.use('/auth', authRoutes);

// User management routes
router.use('/users', userRoutes);

// Debug routes (for development)
router.use('/debug', debugRoutes);

module.exports = router;