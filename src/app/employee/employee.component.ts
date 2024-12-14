import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { employee } from './employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employees: employee[] = [];
  newEmployee: employee = { empId: 0, empName: '', empSalary: 0 };
  editMode: boolean = false;
  employeeToEdit: employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee(): void {
    this.employeeService.getUsers().subscribe(data => {
      this.employees = data;
    });
  }

  addEmployee(): void {
    this.employeeService.createEmployee(this.newEmployee).subscribe(data => {
      this.employees.push(data);
      this.newEmployee = { empId: 0, empName: '', empSalary: 0 };
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter((emp) => emp.empId !== id);
    });
  }

  editEmployee(employee: employee): void {
    this.editMode = true;
    this.employeeToEdit = { ...employee }; // Copy employee details for editing
  }

  updateEmployee(): void {
    if (this.employeeToEdit && this.isValidEmployee(this.employeeToEdit)) {
      this.employeeService.updateEmployee(this.employeeToEdit.empId, this.employeeToEdit).subscribe(
        (updatedEmployee) => {
          const index = this.employees.findIndex((emp) => emp.empId === updatedEmployee.empId);
          if (index > -1) {
            this.employees[index] = updatedEmployee;
          }
          this.editMode = false;
          this.employeeToEdit = null;
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    } else {
      alert('Please provide valid details for the employee.');
    }
  }

  private isValidEmployee(employee: employee): boolean {
    return !!employee && employee.empName.trim() !== '' && employee.empSalary > 0;
  }
}
