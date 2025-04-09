
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all flights
router.get('/', async (req, res) => {
  try {
    const status = req.query.status;
    if (status && status !== 'all') {
      const flights = await db.getByField('flights', 'status', status);
      res.json(flights);
    } else {
      const flights = await db.getAll('flights');
      res.json(flights);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get flight by ID
router.get('/:code', async (req, res) => {
  try {
    const flight = await db.getById('flights', req.params.code, 'flight_code');
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
