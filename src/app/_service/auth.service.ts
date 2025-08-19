import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../_interface/token';
import { Envi } from '../_interface/envi';
import { Login, Register, UserDtos } from '../_interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url =`${Envi.Url}/Auth`;

  constructor(private http: HttpClient) { }

  
  login(login: Login): Observable<Token> {
    return this.http.post<Token>(`${this.url}/login`, login);
  }

  register(request: Register): Observable<UserDtos> {
    return this.http.post<UserDtos>(`${this.url}/register`, request);
  }

  managerRegister(request: Register): Observable<UserDtos> {
    return this.http.post<UserDtos>(`${this.url}/manager`, request);
  }

  refreshToken(): Observable<Token> {
    return this.http.post<Token>(`${this.url}/refresh-token`, {});
  }

}
