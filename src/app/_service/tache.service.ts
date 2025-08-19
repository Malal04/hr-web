import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedList } from '../_interface/paginated-list';
import { TacheDto, Taches } from '../_interface/taches';
import { Envi } from '../_interface/envi';
import { TacheEtat } from '../_enum/taches';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private apiUrl = `${Envi.Url}/Tache`;

  constructor(private http: HttpClient) {}

  getAllTaches(
    page: number,
    pageSize: number,
    employe?: string,
    statut?: TacheEtat | null,
    dateLimiteBefore?: string
  ): Observable<PaginatedList<Taches>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (employe && employe.trim().length) params = params.set('employe', employe.trim());
    if (typeof statut === 'number') params = params.set('statut', String(statut));
    if (dateLimiteBefore) params = params.set('dateLimiteBefore', dateLimiteBefore);

    return this.http.get<PaginatedList<Taches>>(this.apiUrl, { params });
  }

  getTacheById(id: number): Observable<Taches> {
    return this.http.get<Taches>(`${this.apiUrl}/${id}`);
  }

  createTache(tache: Partial<TacheDto>): Observable<TacheDto> {
    return this.http.post<TacheDto>(this.apiUrl, tache);
  }

  updateTache(id: number, tache: Partial<TacheDto>): Observable<TacheDto> {
    return this.http.put<TacheDto>(`${this.apiUrl}/${id}`, tache);
  }

  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  terminerTache(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/terminer`, {});
  }

  annulerTache(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/annuler`, {});
  }
  
}
