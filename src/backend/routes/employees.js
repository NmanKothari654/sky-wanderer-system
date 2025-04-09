
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await db.getAll('employees');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await db.getById('employees', req.params.id, 'ssn');
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  try {
    const newEmployee = req.body;
    
    // Validate required fields
    if (!newEmployee.ssn || !newEmployee.fname || !newEmployee.lname) {
      return res.status(400).json({ error: 'Missing required employee information' });
    }
    
    // In a real implementation, you would execute an INSERT SQL statement here
    // Example: INSERT INTO EMPLOYEE1 (...) VALUES (...)
    
    res.status(201).json({ 
      message: 'Employee created successfully', 
      employee: newEmployee 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an employee
router.put('/:id', async (req, res) => {
  try {
    const ssn = req.params.id;
    const updatedEmployee = req.body;
    
    // Validate SSN
    if (!ssn) {
      return res.status(400).json({ error: 'Employee SSN is required' });
    }
    
    // In production, this would update the employee in Oracle DB
    // Example: UPDATE EMPLOYEE1 SET ... WHERE SSN = :ssn
    
    res.json({ 
      message: 'Employee updated successfully', 
      ssn: ssn 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const ssn = req.params.id;
    
    // In production, this would delete the employee from Oracle DB
    // Example: DELETE FROM EMPLOYEE1 WHERE SSN = :ssn
    
    res.json({ 
      message: 'Employee deleted successfully', 
      ssn: ssn 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get employees by job type
router.get('/job/:type', async (req, res) => {
  try {
    const jobType = req.params.type;
    const employees = await db.getByField('employees', 'jobtype', jobType);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
