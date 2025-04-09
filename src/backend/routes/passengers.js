
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

// Get passengers by flight code
router.get('/flight/:code', async (req, res) => {
  try {
    const flightCode = req.params.code;
    const passengers = await db.getByField('passengers', 'flight_code', flightCode);
    res.json(passengers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new passenger
router.post('/', async (req, res) => {
  try {
    const newPassenger = req.body;
    
    // Validate required fields
    if (!newPassenger.passportno || !newPassenger.fname || !newPassenger.lname) {
      return res.status(400).json({ error: 'Missing required passenger information' });
    }
    
    // In a real implementation, this would insert into multiple Oracle tables
    // Example: INSERT INTO PASSENGER1, PASSENGER2, etc.
    
    res.status(201).json({ 
      message: 'Passenger created successfully', 
      passenger: newPassenger 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a passenger
router.put('/:id', async (req, res) => {
  try {
    const pid = req.params.id;
    const updatedPassenger = req.body;
    
    // Validate passenger ID
    if (!pid) {
      return res.status(400).json({ error: 'Passenger ID is required' });
    }
    
    // In production, this would update the passenger in Oracle DB
    
    res.json({ 
      message: 'Passenger updated successfully', 
      pid: pid 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a passenger
router.delete('/:id', async (req, res) => {
  try {
    const pid = req.params.id;
    
    // In production, this would delete the passenger from Oracle DB
    
    res.json({ 
      message: 'Passenger deleted successfully', 
      pid: pid 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
