import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { User, EditProfileRequest, DeleteAccountRequest } from '../../../core/models/user.model';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: User | null = null;
  editData: EditProfileRequest = {
    firstName: '',
    lastName: '',
    email: ''
  };
  deleteData: DeleteAccountRequest = {
    password: ''
  };

  isEditing = false;
  isDeleting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.editData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onUpdate(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.updateProfile(this.editData).subscribe({
      next: () => {
        this.successMessage = 'Perfil actualizado correctamente';
        this.isEditing = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al actualizar el perfil';
      }
    });
  }

  toggleDelete(): void {
    this.isDeleting = !this.isDeleting;
    this.deleteData.password = '';
    this.errorMessage = '';
  }

  onDelete(): void {
    if (!confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      return;
    }

    this.errorMessage = '';

    this.authService.deleteAccount(this.deleteData).subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al eliminar la cuenta';
      }
    });
  }
}
