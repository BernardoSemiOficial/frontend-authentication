import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../enums/local-storage.enum';
import {
  GenerateAuthUrlGoogleResponse,
  LoginGithubResponse,
  LoginGoogleResponse,
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  RegisterPayload,
  RegisterResponse,
} from '../interfaces/authentication.interface';
import { UserGithub, UserGoogle } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  private readonly baseUrl = 'http://localhost:3000/';

  userLoggedGithub = signal<UserGithub | null>(null);
  userLoggedGoogle = signal<UserGoogle | null>(null);

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
    const redirectUrl = 'http://localhost:4200/loading?provider=github';
    const scope = 'read:user:email';
    const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}&state=${randomUUID}`;
    window.location.replace(AUTH_URL);
  }

  redirectToGoogle() {
    this.http
      .get<GenerateAuthUrlGoogleResponse>(this.baseUrl + 'api/auth/google')
      .subscribe({
        next: (data: GenerateAuthUrlGoogleResponse) => {
          console.log(data);
          window.location.replace(data.url);
        },
      });
  }

  loginGithub(code: string): Observable<LoginGithubResponse> {
    return this.http.post<LoginGithubResponse>(
      this.baseUrl +
        `api/auth/github?code=${code}&state=YOUR_RANDOMLY_GENERATED_STATE`,
      null
    );
  }

  loginGoogle(code: string): Observable<LoginGoogleResponse> {
    return this.http.post<LoginGoogleResponse>(
      this.baseUrl +
        `api/auth/google?code=${code}&state=YOUR_RANDOMLY_GENERATED_STATE`,
      null
    );
  }
}
