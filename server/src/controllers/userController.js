const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users with pagination and filters
const getUsers = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      role, 
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role && role !== 'all') {
      filter.role = role;
    }
    
    if (status) {
      if (status === 'active') {
        filter.isActive = true;
        filter.isApproved = true;
      } else if (status === 'inactive') {
        filter.isActive = false;
      } else if (status === 'pending') {
        filter.isApproved = false;
      }
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get users with pagination
    const users = await User.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-password');

    // Get total count for pagination
    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Get user statistics
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true, isApproved: true });
    const adminUsers = await User.countDocuments({ role: { $in: ['admin', 'super_admin'] } });
    const pendingApproval = await User.countDocuments({ isApproved: false });

    res.json({
      success: true,
      message: 'User statistics retrieved successfully',
      data: {
        totalUsers,
        activeUsers,
        adminUsers,
        pendingApproval
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics',
      error: error.message
    });
  }
};

module.exports = {
  getUsers,
  getUserStats
};