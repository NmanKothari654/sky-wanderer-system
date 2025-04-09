
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

// Create a new flight
router.post('/', async (req, res) => {
  try {
    // In production, this would insert into the Oracle DB
    // For now, we'll just return a success message with the received data
    const newFlight = req.body;
    
    // Validate required fields
    if (!newFlight.flight_code || !newFlight.source || !newFlight.destination) {
      return res.status(400).json({ error: 'Missing required flight information' });
    }
    
    // In a real implementation, you would execute an INSERT SQL statement here
    // Example SQL: INSERT INTO FLIGHT (...) VALUES (...) 
    
    res.status(201).json({ 
      message: 'Flight created successfully', 
      flight: newFlight 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a flight
router.put('/:code', async (req, res) => {
  try {
    const flightCode = req.params.code;
    const updatedFlight = req.body;
    
    // Validate flight code
    if (!flightCode) {
      return res.status(400).json({ error: 'Flight code is required' });
    }
    
    // In production, this would update the flight in Oracle DB
    // Example SQL: UPDATE FLIGHT SET ... WHERE flight_code = :code
    
    res.json({ 
      message: 'Flight updated successfully', 
      flight_code: flightCode 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a flight
router.delete('/:code', async (req, res) => {
  try {
    const flightCode = req.params.code;
    
    // In production, this would delete the flight from Oracle DB
    // Example SQL: DELETE FROM FLIGHT WHERE flight_code = :code
    
    res.json({ 
      message: 'Flight deleted successfully', 
      flight_code: flightCode 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
