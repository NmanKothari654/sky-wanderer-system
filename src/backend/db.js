// Database module for Oracle DB connection
const oracledb = require('oracledb');

// Connection configuration - load from environment variables in production
const dbConfig = {
  user: process.env.DB_USER || 'your_actual_username',
  password: process.env.DB_PASSWORD || 'your_actual_password',
  connectString: process.env.DB_CONNECTION_STRING || 'localhost:1521/your_service_name'
};

// For development/testing purposes, we'll use the mock data
// In production, replace with actual database queries
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

// Database connection initialization - uncomment when ready to use with Oracle DB
async function initialize() {
  try {
    console.log('Attempting to connect to Oracle Database with config:', {
      user: dbConfig.user,
      connectString: dbConfig.connectString
      // We don't log password for security reasons
    });
    
    await oracledb.createPool(dbConfig);
    console.log('Oracle Database connection pool created successfully');
    return true;
  } catch (err) {
    console.error('Error creating Oracle connection pool:', err);
    console.log('Using mock data instead');
    return false;
  }
}

// Execute SQL query against Oracle DB
async function executeQuery(sql, binds = [], opts = {}) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    console.log('SQL query executing:', sql);
    
    const result = await connection.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: true,
      ...opts
    });
    
    console.log(`Query returned ${result.rows ? result.rows.length : 0} rows`);
    return result.rows;
  } catch (err) {
    console.error('Error executing SQL query:', err);
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

// Flag to determine if we're using mock data or real DB
let usingMockData = true;

// Query functions using mock data (for development/testing)
function getAll(entity) {
  if (usingMockData) {
    console.log(`[MOCK DATA] Fetching all ${entity}`);
    return Promise.resolve(mockData[entity] || []);
  } else {
    // This would be replaced by actual DB queries when usingMockData is false
    // For now, we'll still return mock data
    console.log(`[REAL DB] Would fetch all ${entity} from database`);
    return Promise.resolve(mockData[entity] || []);
  }
}

function getById(entity, id, idField) {
  if (usingMockData) {
    console.log(`[MOCK DATA] Fetching ${entity} with ${idField}=${id}`);
    const items = mockData[entity] || [];
    const item = items.find(i => String(i[idField]) === String(id));
    return Promise.resolve(item);
  } else {
    // This would be replaced by actual DB queries when usingMockData is false
    console.log(`[REAL DB] Would fetch ${entity} with ${idField}=${id} from database`);
    const items = mockData[entity] || [];
    const item = items.find(i => String(i[idField]) === String(id));
    return Promise.resolve(item);
  }
}

function getByField(entity, fieldName, value) {
  if (usingMockData) {
    console.log(`[MOCK DATA] Fetching ${entity} with ${fieldName}=${value}`);
    const items = mockData[entity] || [];
    const filteredItems = items.filter(i => String(i[fieldName]).toLowerCase() === String(value).toLowerCase());
    return Promise.resolve(filteredItems);
  } else {
    // This would be replaced by actual DB queries when usingMockData is false
    console.log(`[REAL DB] Would fetch ${entity} with ${fieldName}=${value} from database`);
    const items = mockData[entity] || [];
    const filteredItems = items.filter(i => String(i[fieldName]).toLowerCase() === String(value).toLowerCase());
    return Promise.resolve(filteredItems);
  }
}

// When ready to switch to Oracle DB, uncomment and use these functions instead
/*
async function getAll(entity) {
  const entityMap = {
    'flights': 'FLIGHT',
    'passengers': 'PASSENGER2 p2 JOIN PASSENGER1 p1 ON p2.PASSPORTNO = p1.PASSPORTNO JOIN PASSENGER3 p3 ON p1.PID = p3.PID',
    'employees': 'EMPLOYEE1 e1 JOIN EMPLOYEE2 e2 ON e1.JOBTYPE = e2.JOBTYPE',
    'tickets': 'TICKET1'
  };
  
  const tableName = entityMap[entity] || entity.toUpperCase();
  try {
    return await executeQuery(`SELECT * FROM ${tableName}`);
  } catch (err) {
    console.error(`Error fetching all ${entity}:`, err);
    // Fallback to mock data if query fails
    return mockData[entity] || [];
  }
}

async function getById(entity, id, idField) {
  const entityMap = {
    'flights': { table: 'FLIGHT', field: 'flight_code' },
    'passengers': { table: 'PASSENGER2 p2 JOIN PASSENGER1 p1 ON p2.PASSPORTNO = p1.PASSPORTNO JOIN PASSENGER3 p3 ON p1.PID = p3.PID', field: 'p1.PID' },
    'employees': { table: 'EMPLOYEE1 e1 JOIN EMPLOYEE2 e2 ON e1.JOBTYPE = e2.JOBTYPE', field: 'e1.SSN' },
    'tickets': { table: 'TICKET1', field: 'ticket_number' }
  };
  
  const dbInfo = entityMap[entity] || { table: entity.toUpperCase(), field: idField };
  
  try {
    const result = await executeQuery(
      `SELECT * FROM ${dbInfo.table} WHERE ${dbInfo.field} = :id`,
      [id]
    );
    return result.length > 0 ? result[0] : null;
  } catch (err) {
    console.error(`Error fetching ${entity} by id:`, err);
    // Fallback to mock data
    const items = mockData[entity] || [];
    return items.find(i => String(i[idField]) === String(id));
  }
}

async function getByField(entity, fieldName, value) {
  const entityMap = {
    'flights': 'FLIGHT',
    'passengers': 'PASSENGER2 p2 JOIN PASSENGER1 p1 ON p2.PASSPORTNO = p1.PASSPORTNO JOIN PASSENGER3 p3 ON p1.PID = p3.PID',
    'employees': 'EMPLOYEE1 e1 JOIN EMPLOYEE2 e2 ON e1.JOBTYPE = e2.JOBTYPE',
    'tickets': 'TICKET1'
  };
  
  const tableName = entityMap[entity] || entity.toUpperCase();
  try {
    return await executeQuery(
      `SELECT * FROM ${tableName} WHERE ${fieldName} = :value`,
      [value]
    );
  } catch (err) {
    console.error(`Error fetching ${entity} by field:`, err);
    // Fallback to mock data
    const items = mockData[entity] || [];
    return items.filter(i => String(i[fieldName]).toLowerCase() === String(value).toLowerCase());
  }
}
*/

module.exports = {
  initialize,
  getAll,
  getById,
  getByField,
  executeQuery,
  // Export this variable to allow toggling between mock and real data
  setUseMockData: (useMock) => {
    usingMockData = useMock;
    console.log(`Data source set to: ${useMock ? 'MOCK DATA' : 'REAL DATABASE'}`);
  },
  isUsingMockData: () => usingMockData
};
