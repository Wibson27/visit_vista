// src/routes/places.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Middleware for error handling
const asyncHandler = middleware => (req, res, next) => {
  Promise.resolve(middleware(req, res, next)).catch(next);
};

// Get all places
router.get('/api/places', async (req, res) => {
  try {
      const result = await query(
          `SELECT id, name, description, images, price, category
           FROM places
           ORDER BY created_at DESC`,
          []
      );
      res.json(result.rows);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

module.exports = router;