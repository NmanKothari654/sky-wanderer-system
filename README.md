
# Airport Management System

This is a full-stack application for airport management, with a React frontend and Express backend.

## Project Structure

- `src/`: Frontend React application
  - `components/`: UI components
  - `pages/`: Page components
  - `services/`: API service functions
  - `types/`: TypeScript interfaces
- `src/backend/`: Backend Express server
  - `routes/`: API route handlers
  - `db.js`: Database connection and query functions
  - `server.js`: Express server configuration

## Setup Instructions

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd src/backend
npm install
```

### Step 2: Start the Backend Server

```bash
# From the backend directory
cd src/backend
npm run dev
```

The backend server will start on port 3001.

### Step 3: Start the Frontend Application

```bash
# From the project root directory
npm start
```

The frontend application will start on port 3000.

### Step 4: Connect to a Real Database

Currently, the application uses mock data. To connect to a real database:

1. Install the appropriate database driver:
   ```bash
   cd src/backend
   npm install oracledb
   ```

2. Update the `db.js` file with your database connection details:
   - Uncomment the Oracle DB implementation section
   - Replace the placeholder credentials with your actual database credentials

3. Update the `server.js` file to initialize the database connection:
   ```javascript
   const db = require('./db');
   db.initialize().then(() => {
     app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
     });
   }).catch(err => {
     console.error('Failed to initialize database:', err);
   });
   ```

4. Run the SQL script to create the database schema and seed data:
   ```bash
   # Using Oracle SQL*Plus or another Oracle client
   sqlplus username/password@//host:port/service @path/to/airport_management_system.sql
   ```

## Features

- View and filter flights
- Manage passengers and their tickets
- Employee management
- Ticket booking system

## API Endpoints

- `GET /api/flights`: Get all flights
- `GET /api/flights?status=on-time`: Get flights by status
- `GET /api/flights/:code`: Get flight by code
- `GET /api/passengers`: Get all passengers
- `GET /api/passengers/:id`: Get passenger by ID
- `GET /api/employees`: Get all employees
- `GET /api/employees/:id`: Get employee by ID
- `GET /api/tickets`: Get all tickets
- `GET /api/tickets/:id`: Get ticket by ID

Additional endpoints for creating, updating, and deleting resources will be implemented in future versions.
