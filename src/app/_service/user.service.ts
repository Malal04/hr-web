import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Envi } from '../_interface/envi';
import { Observable } from 'rxjs';
import { UserDtos } from '../_interface/user';
import { Role } from '../_enum/user';

export interface UserProfile {
  id: number;
  nomComplete: string;
  email: string;
  phoneNumber: string;
  poste: string;
  dateEmbauche: string;
  salaire: number;
  accountState: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url =`${Envi.Url}/User`;

  constructor(private http: HttpClient) { }

  getAllProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.url}/profile`);
  }

}
