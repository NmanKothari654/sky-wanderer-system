
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const flightRoutes = require('./routes/flights');
const passengerRoutes = require('./routes/passengers');
const employeeRoutes = require('./routes/employees');
const ticketRoutes = require('./routes/tickets');

const app = express();

// Enable CORS for frontend requests
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-frontend-domain.com' 
    : 'http://localhost:5173', // Default Vite dev server port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Mount routes
app.use('/api/flights', flightRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tickets', ticketRoutes);

// Sample root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Airport Management System API' });
});

// Initialize database and start server
const PORT = process.env.PORT || 3001;

// Attempt to initialize database connection
db.initialize()
  .then(() => {
    console.log('Database initialized successfully');
  })
  .catch(err => {
    console.error('Database initialization failed:', err);
    console.log('Continuing with mock data');
  })
  .finally(() => {
    // Start server regardless of database connection status
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
