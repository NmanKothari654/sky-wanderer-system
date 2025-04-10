
// This service handles API requests to the backend server
import { Airline, Airport, Flight, Passenger, Employee, Ticket } from "../types";

// Backend API URL - use relative URL for same-origin requests
// or the full URL for cross-origin requests in development/production
const API_URL = "/api";

// Helper function to handle API requests
const fetchData = async <T>(endpoint: string): Promise<T[]> => {
  try {
    console.log(`[Frontend API] Fetching from ${API_URL}/${endpoint}`);
    const response = await fetch(`${API_URL}/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`[Frontend API] Successfully fetched ${data.length} items from ${endpoint}`);
    return data;
  } catch (error) {
    console.error(`[Frontend API] Error fetching data from ${endpoint}:`, error);
    // Return empty array as fallback during development
    return [] as T[];
  }
};

// API functions for each entity
export const getAirlines = () => fetchData<Airline>("airlines");
export const getAirports = () => fetchData<Airport>("airports");
export const getFlights = () => fetchData<Flight>("flights");
export const getPassengers = () => fetchData<Passenger>("passengers");
export const getEmployees = () => fetchData<Employee>("employees");
export const getTickets = () => fetchData<Ticket>("tickets");

// Function to get flights by status
export const getFlightsByStatus = async (status: string): Promise<Flight[]> => {
  try {
    console.log(`[Frontend API] Fetching flights with status: ${status}`);
    const response = await fetch(`${API_URL}/flights?status=${status}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`[Frontend API] Successfully fetched ${data.length} flights with status ${status}`);
    return data;
  } catch (error) {
    console.error(`[Frontend API] Error fetching flights by status:`, error);
    return [];
  }
};

// Example of a more complex function that would be implemented in the backend
export const getEconomyPassengersToDFW = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL}/reports/economy-passengers-dfw`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching economy passengers to DFW:', error);
    return [];
  }
};

// Create new flight
export const createFlight = async (flight: Omit<Flight, 'id'>): Promise<Flight> => {
  try {
    const response = await fetch(`${API_URL}/flights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(flight)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating flight:', error);
    throw error;
  }
};

// Update an existing flight
export const updateFlight = async (flightCode: string, flight: Partial<Flight>): Promise<Flight> => {
  try {
    const response = await fetch(`${API_URL}/flights/${flightCode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(flight)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating flight:', error);
    throw error;
  }
};
