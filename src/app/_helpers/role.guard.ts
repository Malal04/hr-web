import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { TokenService } from '../_service/token.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRoles: string[] = route.data['expectedRoles'];
    const userRole = this.tokenService.getRole();
  
    if (userRole !== null && expectedRoles.includes(userRole.toString())) {
      return true;
    }
  
    return this.router.createUrlTree(['']);
  }
}
