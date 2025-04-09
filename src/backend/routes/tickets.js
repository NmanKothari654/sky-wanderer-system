
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await db.getAll('tickets');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await db.getById('tickets', req.params.id, 'ticket_number');
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
