
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const flightRoutes = require('./routes/flights');
const passengerRoutes = require('./routes/passengers');
const employeeRoutes = require('./routes/employees');
const ticketRoutes = require('./routes/tickets');

const app = express();

app.use(cors());
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
