// AuthInterceptorService

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let clonedReq = req;
    if (token) {
      clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(clonedReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Token expired or invalid
          this.authService.logout();
          this.router.navigate(['/login']); // Rediriger vers la page de connexion
          return throwError(err);
        }
        return throwError(err);
      })
    );
  }
}
