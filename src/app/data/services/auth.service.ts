import { Injectable } from '@angular/core';
import { of, Observable, lastValueFrom, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../network/api.service';
import { HttpErrorResponse } from '@angular/common/http';

export type SignInFailure = 'EMAIL_OR_PASSWORD_INVALID';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly apiService: ApiService) {}

  signIn(payload: { email: string; password: string }): Observable<void> {
    return this.apiService
      .signIn(payload)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  signOut() {
    return this.apiService.signOut().pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  isAuthenticated(): Promise<boolean> {
    return lastValueFrom(
      this.apiService.getAuthenticationStatus().pipe(
        map(() => true),
        catchError(() => of(false)),
      ),
    );
  }

  refreshToken(): Observable<void> {
    return this.apiService.refreshToken();
  }
}
