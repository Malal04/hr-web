import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityLog, PaginatedLogs } from '../_interface/paginated-list';
import { Envi } from '../_interface/envi';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  private apiUrl =`${Envi.Url}/ActivityLogs`;

  constructor(private http: HttpClient) {}

  // Récupérer tous les logs
  getAll(): Observable<PaginatedLogs> {
    return this.http.get<PaginatedLogs>(this.apiUrl);
  }

  // Récupérer un log par ID
  getById(id: number): Observable<ActivityLog> {
    return this.http.get<ActivityLog>(`${this.apiUrl}/${id}`);
  }

  // Supprimer un log
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Vider tous les logs
  clearAll(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`);
  }

}
