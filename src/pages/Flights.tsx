
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "@/components/PageLayout";
import { getFlights, getFlightsByStatus } from "@/services/api";
import { Flight } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Flights = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Use React Query to fetch flights data
  const { data: flights = [], isLoading, error } = useQuery({
    queryKey: ['flights', statusFilter],
    queryFn: () => statusFilter !== 'all' ? getFlightsByStatus(statusFilter) : getFlights(),
  });

  // Filter flights based on search term
  const filteredFlights = flights.filter(flight =>
    flight.flight_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewFlight = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add new flights will be available in a future update.",
    });
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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
        <Button onClick={handleAddNewFlight}>Add New Flight</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading flights data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
          <p>Error loading flights data. Please try again later.</p>
        </div>
      ) : (
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
      )}
    </PageLayout>
  );
};

export default Flights;
