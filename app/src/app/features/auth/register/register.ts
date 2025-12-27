import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { RegisterRequest } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerData: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        // El registro fue exitoso, ahora hacer login automáticamente
        const loginData = {
          email: this.registerData.email,
          password: this.registerData.password,
          rememberMe: false
        };

        this.authService.login(loginData).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/courses']);
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Registro exitoso pero error al iniciar sesión. Por favor, inicia sesión manualmente.';
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Error al registrar. Intenta nuevamente.';
      }
    });
  }
}
