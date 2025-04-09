
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { getPassengers } from "@/services/api";
import { Passenger } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Passengers = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [filteredPassengers, setFilteredPassengers] = useState<Passenger[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const data = await getPassengers();
        setPassengers(data);
        setFilteredPassengers(data);
      } catch (error) {
        console.error("Error fetching passengers:", error);
      }
    };

    fetchPassengers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = passengers.filter(
        passenger =>
          passenger.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          passenger.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          passenger.passportno.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPassengers(filtered);
    } else {
      setFilteredPassengers(passengers);
    }
  }, [searchTerm, passengers]);

  return (
    <PageLayout title="Passenger Management">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <Input
          placeholder="Search by name or passport number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button>Add New Passenger</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PID</TableHead>
              <TableHead>Passport No</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Flight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPassengers.length > 0 ? (
              filteredPassengers.map((passenger) => (
                <TableRow key={`${passenger.pid}-${passenger.passportno}`}>
                  <TableCell>{passenger.pid}</TableCell>
                  <TableCell>{passenger.passportno}</TableCell>
                  <TableCell>{passenger.fname}</TableCell>
                  <TableCell>{passenger.lname}</TableCell>
                  <TableCell>{passenger.age}</TableCell>
                  <TableCell>{passenger.sex}</TableCell>
                  <TableCell>{passenger.phone}</TableCell>
                  <TableCell>{passenger.flight_code || 'Not assigned'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">No passengers found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PageLayout>
  );
};

export default Passengers;
