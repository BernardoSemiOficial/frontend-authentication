import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function authenticationInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const newReq = addAccessTokenToRequest(req, authService);

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const loginOrRefresh = requestToLoginOrRefreshToken(req.url, authService);
      if (loginOrRefresh) throwError(() => error);
      if (error instanceof HttpErrorResponse && error.status !== 401)
        throwError(() => error);
      return retryRequestWithNewAccessToken(newReq, next, authService);
    })
  );
}

const addAccessTokenToRequest = (
  req: HttpRequest<unknown>,
  authService: AuthService
): HttpRequest<unknown> => {
  const authAccessToken = authService.getAccessToken();
  if (!authAccessToken) return req;

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authAccessToken}`,
    },
  });
  return newReq;
};

const retryRequestWithNewAccessToken = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
) => {
  return authService.refreshToken().pipe(
    switchMap((response) => {
      authService.setAccessToken(response.accessToken);
      const retryRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });
      return next(retryRequest);
    }),
    catchError((error) => {
      authService.logout();
      return throwError(() => error);
    })
  );
};

const requestToLoginOrRefreshToken = (
  url: string,
  authService: AuthService
) => {
  if (url.includes('refreshtoken')) {
    authService.logout();
  }
  return url.includes('refreshtoken') || url.includes('login');
};
