
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { getTickets } from "@/services/api";
import { Ticket } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
        setFilteredTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = tickets.filter(
        ticket =>
          ticket.ticket_number.toString().includes(searchTerm) ||
          ticket.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.passportno.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(tickets);
    }
  }, [searchTerm, tickets]);

  return (
    <PageLayout title="Ticket Management">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <Input
          placeholder="Search by ticket number, route, or passport..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button>Book New Ticket</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket Number</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Travel Date</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Seat</TableHead>
              <TableHead>Passenger ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TableRow key={ticket.ticket_number}>
                  <TableCell>{ticket.ticket_number}</TableCell>
                  <TableCell>{ticket.source}</TableCell>
                  <TableCell>{ticket.destination}</TableCell>
                  <TableCell>{ticket.date_of_travel}</TableCell>
                  <TableCell>{ticket.date_of_booking}</TableCell>
                  <TableCell>{ticket.class}</TableCell>
                  <TableCell>{ticket.seatno}</TableCell>
                  <TableCell>{ticket.pid} ({ticket.passportno})</TableCell>
                  <TableCell>
                    {ticket.date_of_cancellation ? (
                      <Badge variant="destructive">Cancelled</Badge>
                    ) : (
                      <Badge variant="default">Active</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">No tickets found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PageLayout>
  );
};

export default Tickets;
