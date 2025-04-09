
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { getFlights, getFlightsByStatus } from "@/services/api";
import { Flight } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Flights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights();
        setFlights(data);
        setFilteredFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    // Filter flights based on search term and status
    let result = flights;
    
    if (searchTerm) {
      result = result.filter(flight =>
        flight.flight_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(flight => flight.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    setFilteredFlights(result);
  }, [searchTerm, statusFilter, flights]);

  const handleStatusFilterChange = async (value: string) => {
    setStatusFilter(value);
    
    if (value !== "all") {
      try {
        const data = await getFlightsByStatus(value);
        setFilteredFlights(data);
      } catch (error) {
        console.error("Error fetching flights by status:", error);
      }
    } else {
      setFilteredFlights(flights);
    }
  };

  return (
    <PageLayout title="Flight Management">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4 w-full md:w-2/3">
          <Input
            placeholder="Search by flight code, source, or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="on-time">On-Time</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Add New Flight</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flight Code</TableHead>
              <TableHead>Airline ID</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Stops</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <TableRow key={flight.flight_code}>
                  <TableCell>{flight.flight_code}</TableCell>
                  <TableCell>{flight.airlineid}</TableCell>
                  <TableCell>{flight.source}</TableCell>
                  <TableCell>{flight.destination}</TableCell>
                  <TableCell>{flight.departure}</TableCell>
                  <TableCell>{flight.arrival}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      flight.status.toLowerCase() === 'on-time' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {flight.status}
                    </span>
                  </TableCell>
                  <TableCell>{flight.flighttype}</TableCell>
                  <TableCell>{flight.no_of_stops}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">No flights found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PageLayout>
  );
};

export default Flights;
