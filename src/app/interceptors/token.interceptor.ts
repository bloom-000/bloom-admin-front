import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../data/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly route: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    if (
      req.url.indexOf('/authentication/admin/refresh') > -1 ||
      req.url.indexOf('/authentication/admin/status') > -1 ||
      req.url.indexOf('/authentication/admin/sign-in') > -1
    ) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next, error);
        }
        return throwError(() => error);
      }),
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    originalError: HttpErrorResponse,
  ) {
    return this.authService.refreshToken().pipe(
      switchMap(() => next.handle(req)),
      catchError(async () => {
        await this.route.navigate(['/auth/sign-in']);
        return throwError(() => originalError);
      }),
    );
  }
}
