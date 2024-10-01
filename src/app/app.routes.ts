import { Routes } from '@angular/router';
import { canActivateAuth } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'loading',
    loadComponent: () =>
      import('./modules/loading-page/loading-page.component').then(
        (m) => m.LoadingPageComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [canActivateAuth],
    loadComponent: () =>
      import('./modules/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
