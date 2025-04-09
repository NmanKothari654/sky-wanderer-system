
// This is a mock database module
// In a real application, you would connect to your Oracle database here
// using a library like oracledb

const mockData = {
  flights: [
    {
      flight_code: 'FL001',
      source: 'New York',
      destination: 'Los Angeles',
      arrival: '2023-04-10T10:30:00',
      departure: '2023-04-10T07:30:00',
      status: 'on-time',
      duration: '3h 0m',
      flighttype: 'Domestic',
      layover_time: '0h',
      no_of_stops: 0,
      airlineid: 'AA'
    },
    {
      flight_code: 'FL002',
      source: 'Chicago',
      destination: 'Miami',
      arrival: '2023-04-10T14:15:00',
      departure: '2023-04-10T11:45:00',
      status: 'delayed',
      duration: '2h 30m',
      flighttype: 'Domestic',
      layover_time: '0h',
      no_of_stops: 0,
      airlineid: 'UA'
    },
    {
      flight_code: 'FL003',
      source: 'Dallas',
      destination: 'London',
      arrival: '2023-04-11T07:20:00',
      departure: '2023-04-10T18:00:00',
      status: 'on-time',
      duration: '9h 20m',
      flighttype: 'International',
      layover_time: '0h',
      no_of_stops: 0,
      airlineid: 'BA'
    }
  ],
  passengers: [
    {
      pid: 1,
      passportno: 'A12345678',
      fname: 'John',
      lname: 'Doe',
      address: '123 Main St, New York',
      phone: 1234567890,
      age: 35,
      sex: 'M',
      flight_code: 'FL001'
    },
    {
      pid: 2,
      passportno: 'B87654321',
      fname: 'Jane',
      lname: 'Smith',
      address: '456 Park Ave, Chicago',
      phone: 9876543210,
      age: 28,
      sex: 'F',
      flight_code: 'FL002'
    }
  ],
  employees: [
    {
      ssn: 123456789,
      fname: 'Robert',
      lname: 'Johnson',
      address: '789 Oak St, Dallas',
      phone: 5551234567,
      age: 42,
      sex: 'M',
      jobtype: 'Pilot',
      ap_name: 'DFW Airport',
      salary: 120000
    },
    {
      ssn: 987654321,
      fname: 'Sarah',
      lname: 'Williams',
      address: '321 Pine Rd, Miami',
      phone: 5559876543,
      age: 35,
      sex: 'F',
      jobtype: 'Flight Attendant',
      ap_name: 'MIA Airport',
      salary: 65000
    }
  ],
  tickets: [
    {
      ticket_number: 1001,
      source: 'New York',
      destination: 'Los Angeles',
      date_of_booking: '2023-03-15',
      date_of_travel: '2023-04-10',
      seatno: '12A',
      class: 'Economy',
      pid: 1,
      passportno: 'A12345678'
    },
    {
      ticket_number: 1002,
      source: 'Chicago',
      destination: 'Miami',
      date_of_booking: '2023-03-20',
      date_of_travel: '2023-04-10',
      seatno: '5B',
      class: 'Business',
      pid: 2,
      passportno: 'B87654321'
    }
  ]
};

// Query functions
function getAll(entity) {
  return Promise.resolve(mockData[entity] || []);
}

function getById(entity, id, idField) {
  const items = mockData[entity] || [];
  const item = items.find(i => String(i[idField]) === String(id));
  return Promise.resolve(item);
}

function getByField(entity, fieldName, value) {
  const items = mockData[entity] || [];
  const filteredItems = items.filter(i => String(i[fieldName]).toLowerCase() === String(value).toLowerCase());
  return Promise.resolve(filteredItems);
}

module.exports = {
  getAll,
  getById,
  getByField
};

/* 
// In a real implementation with Oracle DB, you would use something like this:

const oracledb = require('oracledb');

const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  connectString: 'localhost:1521/your_service_name'
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Connection pool created');
  } catch (err) {
    console.error('Error creating connection pool:', err);
    throw err;
  }
}

async function execute(sql, binds = [], opts = {}) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(sql, binds, opts);
    return result;
  } catch (err) {
    console.error('Error executing SQL:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

module.exports = { initialize, execute };
*/
