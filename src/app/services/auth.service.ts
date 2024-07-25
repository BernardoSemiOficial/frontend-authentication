import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../enums/local-storage.enum';
import {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  RegisterPayload,
  RegisterResponse,
} from '../interfaces/authentication.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private readonly baseUrl = 'http://localhost:3000/';

  login(user: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + 'api/auth/login', user);
  }

  logout() {
    localStorage.removeItem(LocalStorage.AccessToken);
    localStorage.removeItem(LocalStorage.RefreshToken);
    this.router.navigate(['/login']);
  }

  register(registerPayload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      this.baseUrl + 'api/auth/register',
      registerPayload
    );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken =
      localStorage.getItem(LocalStorage.RefreshToken) ?? null;
    return this.http.post<RefreshTokenResponse>(
      this.baseUrl + 'api/auth/refresh-token',
      {
        refreshToken,
      }
    );
  }

  getAccessToken() {
    return localStorage.getItem(LocalStorage.AccessToken) ?? null;
  }

  setTokens({ accessToken, refreshToken }: LoginResponse) {
    localStorage.setItem(LocalStorage.AccessToken, accessToken);
    localStorage.setItem(LocalStorage.RefreshToken, refreshToken);
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem(LocalStorage.AccessToken, accessToken);
  }
}
