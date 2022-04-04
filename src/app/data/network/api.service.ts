import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignInBody } from './body/sign-in.body';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private readonly client: HttpClient) {}

  signIn(body: SignInBody): Observable<void> {
    return this.client.post<void>(`${API_URL}/authentication/sign-in`, body, {
      withCredentials: true,
    });
  }

  signOut(): Observable<void> {
    return this.client.post<void>(
      `${API_URL}/authentication/sign-out`,
      undefined,
      { withCredentials: true },
    );
  }

  getAuthenticationStatus(): Observable<void> {
    return this.client.get<void>(`${API_URL}/authentication/status`, {
      withCredentials: true,
    });
  }

  refreshToken(): Observable<void> {
    return this.client.post<void>(
      `${API_URL}/authentication/refresh`,
      undefined,
      { withCredentials: true },
    );
  }
}
