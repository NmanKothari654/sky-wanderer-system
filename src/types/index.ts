
// Define TypeScript interfaces for our data models

export interface City {
  cname: string;
  state: string;
  country: string;
}

export interface Airport {
  ap_name: string;
  state: string;
  country: string;
  cname: string;
}

export interface Airline {
  airlineid: string;
  al_name: string;
  three_digit_code: string;
}

export interface Flight {
  flight_code: string;
  source: string;
  destination: string;
  arrival: string;
  departure: string;
  status: string;
  duration: string;
  flighttype: string;
  layover_time: string;
  no_of_stops: number;
  airlineid: string;
}

export interface Passenger {
  pid: number;
  passportno: string;
  fname: string;
  lname: string;
  address: string;
  phone: number;
  age: number;
  sex: string;
  flight_code?: string;
}

export interface Employee {
  ssn: number;
  fname: string;
  lname: string;
  address: string;
  phone: number;
  age: number;
  sex: string;
  jobtype: string;
  ap_name: string;
  salary?: number;
}

export interface Ticket {
  ticket_number: number;
  source: string;
  destination: string;
  date_of_booking: string;
  date_of_travel: string;
  seatno: string;
  class: string;
  pid: number;
  passportno: string;
  date_of_cancellation?: string;
}
