import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../enums/local-storage.enum';
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
  private readonly router: Router = inject(Router);

  githubCode!: string | null;

  ngOnInit() {
    this.getGithubCode();
  }

  getGithubCode() {
    this.githubCode =
      this.activatedRoute.snapshot.queryParamMap.get('code') ?? null;
    this.getUserGithub();
  }

  getUserGithub() {
    if (this.githubCode === null) return;
    this.authService.loginGithub(this.githubCode).subscribe({
      next: (data) => {
        localStorage.setItem(
          LocalStorage.AccessToken,
          `${data.tokenType} ${data.token}`
        );
        this.router.navigate(['/dashboard']);
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
