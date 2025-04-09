
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, Users, Briefcase, Ticket, Home } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-slate-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Plane className="h-6 w-6" />
          <h1 className="text-xl font-bold">Airport Management System</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="ghost" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link to="/flights" className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  Flights
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link to="/passengers" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Passengers
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link to="/employees" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Employees
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link to="/tickets" className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  Tickets
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
