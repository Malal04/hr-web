import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../_service/token.service';
import { ApiErrorService } from '../_subjects/api-error.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const apiErrorService = inject(ApiErrorService);
  const accessToken = tokenService.getToken();
  const router = inject(Router);

  if (accessToken && !tokenService.isTokenExpired(accessToken)) {
    const clone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    return next(clone).pipe(
      catchError(error => {
        if (
          (error.status === 450 || error.status === 460)
        ) {
          tokenService.clearTokenExpired();
          apiErrorService.sendError('Session expirée ou accès interdit.');
          router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }

  return next(req);

};
