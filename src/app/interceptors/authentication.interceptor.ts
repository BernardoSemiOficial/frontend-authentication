import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function authenticationInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const authAccessToken = authService.getAccessToken();
  const newRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authAccessToken}`,
    },
  });

  return next(newRequest).pipe(
    catchError((error) => {
      const loginOrRefresh = requestToLoginOrRefreshToken(authService, req.url);
      if (loginOrRefresh) {
        return error;
      }
      if (error.status !== 401) {
        return error;
      }

      return authService.refreshToken().pipe(
        tap((response) => {
          authService.setAccessToken(response.accessToken);
          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            })
          );
        }),
        catchError((error) => {
          authService.logout();
          return error;
        })
      );
    })
  );
}

const requestToLoginOrRefreshToken = (
  authService: AuthService,
  url: string
) => {
  if (url.includes('refreshtoken')) {
    authService.logout();
  }
  return url.includes('refreshtoken') || url.includes('login');
};
