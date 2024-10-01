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

  redirectToGithub() {
    const randomUUID = Math.random() * 100;
    const clientId = 'Ov23liH1LnBmHjiEZ9nS';
    const redirectUrl = 'http://localhost:4200/loading';
    const scope = 'read:user&20user:email';
    const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}&state=${randomUUID}`;
    window.location.replace(AUTH_URL);
  }

  loginGithub(code: string): Observable<any> {
    return this.http.post<any>(
      this.baseUrl +
        `api/auth/github?code=${code}&state=YOUR_RANDOMLY_GENERATED_STATE`,
      null
    );
  }
}
