const express = require('express');
const router = express.Router();

// API welcome endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'AI Calling Agent API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      agents: '/api/agents',
      calls: '/api/calls',
      analytics: '/api/analytics'
    }
  });
});

// Agents endpoints
router.get('/agents', (req, res) => {
  // TODO: Implement agent management
  res.json({
    message: 'Agents endpoint - Coming soon',
    agents: []
  });
});

router.post('/agents', (req, res) => {
  // TODO: Create new agent
  res.json({
    message: 'Create agent endpoint - Coming soon'
  });
});

// Calls endpoints
router.get('/calls', (req, res) => {
  // TODO: Implement call management
  res.json({
    message: 'Calls endpoint - Coming soon',
    calls: []
  });
});

router.post('/calls', (req, res) => {
  // TODO: Create new call
  res.json({
    message: 'Create call endpoint - Coming soon'
  });
});

// Analytics endpoints
router.get('/analytics', (req, res) => {
  // TODO: Implement analytics
  res.json({
    message: 'Analytics endpoint - Coming soon',
    data: {}
  });
});

module.exports = router;