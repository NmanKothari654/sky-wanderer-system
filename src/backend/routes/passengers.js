
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all passengers
router.get('/', async (req, res) => {
  try {
    const passengers = await db.getAll('passengers');
    res.json(passengers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get passenger by ID
router.get('/:id', async (req, res) => {
  try {
    const passenger = await db.getById('passengers', req.params.id, 'pid');
    if (!passenger) {
      return res.status(404).json({ error: 'Passenger not found' });
    }
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
