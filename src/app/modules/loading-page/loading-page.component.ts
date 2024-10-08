import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.scss',
})
export class LoadingPageComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly router: Router = inject(Router);

  githubCode!: string | null;
  googleCode!: string | null;

  ngOnInit() {
    this.getGithubCode();
    this.getGoogleCode();
  }

  getGithubCode() {
    this.githubCode =
      this.activatedRoute.snapshot.queryParamMap.get('code') ?? null;
    this.getUserGithub();
  }

  getGoogleCode() {
    this.googleCode =
      this.activatedRoute.snapshot.queryParamMap.get('code') ?? null;
    this.getUserGoogle();
  }

  getUserGithub() {
    if (this.githubCode === null) return;
    this.authService.loginGithub(this.githubCode).subscribe({
      next: (data) => {
        this.authService.setTokens(data);
        this.authService.userLogged.set(data.user);
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User logged in',
        });
      },
      error: (error) => {
        console.log(error);
        this.logoutUser();
      },
    });
  }

  getUserGoogle() {
    if (this.googleCode === null) return;
    this.authService.loginGoogle(this.googleCode).subscribe({
      next: (data) => {
        this.authService.setTokens(data);
        this.authService.userLogged.set(data.user);
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User logged in',
        });
      },
      error: (error) => {
        console.log(error);
        this.logoutUser();
      },
    });
  }

  logoutUser() {
    this.authService.logout();
  }
}
