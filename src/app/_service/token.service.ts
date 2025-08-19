import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../_enum/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) {}

  // ===== Access Token =====
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  clearTokenExpired(): void {
    this.removeToken();
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  // ===== Refresh Token =====
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  removeRefreshToken(): void {
    localStorage.removeItem('refreshToken');
  }

  // ===== Role =====
  setRole(role: Role): void {
    localStorage.setItem('role', role.toString());
  }

  getRole(): Role | null {
    const role = localStorage.getItem('role');
    if (!role) return null;
    return Number(role) as Role;
  }
  
  isAdmin(): boolean {
    const role = this.getRole();
    return role === Role.Admin || role === Role.Manager;
  }

  // ===== Logout =====
  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  // ===== JWT Decoding =====
  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));  
      return payload.exp * 1000 < Date.now();  
    } catch {
      return true; 
    }
  }

}
