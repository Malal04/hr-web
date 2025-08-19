import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envi } from '../_interface/envi';
import { DepartementDto, DepartementStatusDto } from '../_interface/departement';
import { Observable } from 'rxjs';
import { PaginatedList } from '../_interface/paginated-list';
import { DepartementStatus } from '../_enum/user';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private baseUrl = `${Envi.Url}/Departement`;

  constructor(private http: HttpClient) { }

  /** 🔹 Créer un département (ADMIN uniquement) */
  createDepartement(dto: DepartementStatusDto): Observable<DepartementStatusDto> {
    return this.http.post<DepartementStatusDto>(this.baseUrl, dto);
  }

  /** 🔹 Récupérer un département par ID */
  getDepartementById(id: number): Observable<DepartementDto> {
    return this.http.get<DepartementDto>(`${this.baseUrl}/${id}`);
  }

  /** 🔹 Récupérer tous les départements avec pagination (ADMIN uniquement) */
  getAllDepartements(page: number, pageSize: number): Observable<PaginatedList<DepartementDto>> {
    return this.http.get<PaginatedList<DepartementDto>>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getAllDepart(): Observable<DepartementDto[]> {
    return this.http.get<DepartementDto[]>(`${this.baseUrl}/all`);
  }

  /** 🔹 Mettre à jour un département (ADMIN uniquement) */
  updateDepartement(id: number, dto: DepartementDto): Observable<DepartementDto> {
    return this.http.put<DepartementDto>(`${this.baseUrl}/${id}`, dto);
  }

  /** 🔹 Supprimer un département (Soft delete, ADMIN uniquement) */
  deleteDepartement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  changeDepartementStatus(id: number, newStatus: DepartementStatus): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status`, { newStatus });
  }
  
}
