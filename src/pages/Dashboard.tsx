
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { getAirlines, getAirports, getFlights } from "@/services/api";
import { Airline, Airport, Flight } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Building, Building2, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [delayedFlights, setDelayedFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [airlinesData, airportsData, flightsData] = await Promise.all([
          getAirlines(),
          getAirports(),
          getFlights()
        ]);
        
        setAirlines(airlinesData);
        setAirports(airportsData);
        setFlights(flightsData);
        
        // Filter delayed flights
        const delayed = flightsData.filter(flight => flight.status === 'Delayed');
        setDelayedFlights(delayed);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <PageLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Airlines</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{airlines.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Airports</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{airports.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flights.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed Flights</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{delayedFlights.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Flights</CardTitle>
          </CardHeader>
          <CardContent>
            {flights.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-2 text-left">Flight Code</th>
                      <th className="py-3 px-2 text-left">Airline</th>
                      <th className="py-3 px-2 text-left">From</th>
                      <th className="py-3 px-2 text-left">To</th>
                      <th className="py-3 px-2 text-left">Departure</th>
                      <th className="py-3 px-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.slice(0, 5).map((flight) => (
                      <tr key={flight.flight_code} className="border-b">
                        <td className="py-2 px-2">{flight.flight_code}</td>
                        <td className="py-2 px-2">{flight.airlineid}</td>
                        <td className="py-2 px-2">{flight.source}</td>
                        <td className="py-2 px-2">{flight.destination}</td>
                        <td className="py-2 px-2">{flight.departure}</td>
                        <td className="py-2 px-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            flight.status === 'On-time' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {flight.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">No flights available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
