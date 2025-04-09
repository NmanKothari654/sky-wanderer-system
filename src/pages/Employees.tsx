
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { getEmployees } from "@/services/api";
import { Employee } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = employees.filter(
        employee =>
          employee.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.ssn.toString().includes(searchTerm) ||
          employee.jobtype.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchTerm, employees]);

  return (
    <PageLayout title="Employee Management">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <Input
          placeholder="Search by name, SSN, or job type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button>Add New Employee</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SSN</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Airport</TableHead>
              <TableHead>Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.ssn}>
                  <TableCell>{employee.ssn}</TableCell>
                  <TableCell>{employee.fname}</TableCell>
                  <TableCell>{employee.lname}</TableCell>
                  <TableCell>{employee.age}</TableCell>
                  <TableCell>{employee.sex}</TableCell>
                  <TableCell>{employee.jobtype}</TableCell>
                  <TableCell>{employee.ap_name}</TableCell>
                  <TableCell>${employee.salary?.toLocaleString() || 'N/A'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">No employees found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PageLayout>
  );
};

export default Employees;
