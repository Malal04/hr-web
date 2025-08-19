import { Injectable } from '@angular/core';
import { Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Employe, EmployeDto } from '../_interface/employe';
import { Observable } from 'rxjs';
import { AccountState } from '../_enum/user';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private baseUrl = `${Envi.Url}/Employer`;
 
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.baseUrl);
  }

  // Tous les employés + managers (Active + Blocked)
  getAllUsers(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.baseUrl}/all-users`);
  }
  
  // Tous les employés (Active + Blocked)
  getAllEmpl(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.baseUrl}/all-employees`);
  }

  getEmployeeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.baseUrl}/${id}`);
  }

  updateEmploye(id: number, dto: EmployeDto): Observable<EmployeDto> {
    return this.http.put<EmployeDto>(`${this.baseUrl}/${id}`, dto);
  }

  deleteEmploye(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  changeEmployeeStatus(id: number, newStatus: AccountState): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status`, { newStatus });
  }

}
