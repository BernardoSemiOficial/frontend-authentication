import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {
  LoginPayload,
  LoginResponse,
} from '../../interfaces/authentication.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterModule,
  ],
  providers: [AuthService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  loginForm = this.initForm();

  initForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    if (this.loginForm.invalid) return;

    const registerFormValue = this.loginForm.getRawValue();
    const payload: LoginPayload = {
      email: registerFormValue.email!,
      password: registerFormValue.password!,
    };
    this.authService.login(payload).subscribe({
      next: (data: LoginResponse) => {
        this.authService.setTokens(data);
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User logged in',
        });
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid credentials',
        });
      },
    });
  }

  redirectToGithub() {
    this.authService.redirectToGithub();
  }

  redirectToGoogle() {
    this.authService.redirectToGoogle();
  }
}
