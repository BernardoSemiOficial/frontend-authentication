import { CommonModule, JsonPipe } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthenticationProviders } from '../../enums/authentication-providers';
import { UserInfo } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProfileComponent],
  providers: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly userService: UserService = inject(UserService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly messageService: MessageService = inject(MessageService);

  githubCode!: string | null;
  userLogged!: UserInfo | null;
  AuthenticationProviders = AuthenticationProviders;

  constructor() {
    effect(() => {
      this.userLogged = this.authService.userLogged();
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe();
  }

  logoutUser() {
    this.authService.logout();
  }
}
