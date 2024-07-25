import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule],
  providers: [UserService, AuthService, MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User logged in',
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid credentials',
        });
      },
    });
  }

  logoutUser() {
    this.authService.logout();
  }
}
