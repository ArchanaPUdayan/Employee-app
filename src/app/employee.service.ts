import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from './employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl="http://localhost:8080/api/employees"

  constructor(private http:HttpClient) { }

  getUsers():Observable<employee[]>{
    return this.http.get<employee[]>(this.apiUrl);
  }
  createEmployee(employee:employee):Observable<employee>{
    return this.http.post<employee>(this.apiUrl,employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateEmployee(id: number, employee: employee): Observable<employee> {
    return this.http.put<employee>(`${this.apiUrl}/update/${id}`, employee);
  }

  getEmployeeById(id: number): Observable<employee> {
    return this.http.get<employee>(`${this.apiUrl}/get/${id}`);
  }


}
