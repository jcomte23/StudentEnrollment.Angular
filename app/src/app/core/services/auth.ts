import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  EditProfileRequest,
  DeleteAccountRequest
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Solo intentar cargar el perfil si hay token
      this.getProfile().subscribe({
        error: () => {
          // Si falla, limpiar el token inválido
          this.logout();
        }
      });
    }
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/account/register`, data)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/account/login`, data)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/account/my-profile`)
      .pipe(
        tap(user => this.currentUserSubject.next(user))
      );
  }

  updateProfile(data: EditProfileRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/account/my-profile`, data)
      .pipe(
        tap(user => this.currentUserSubject.next(user))
      );
  }

  deleteAccount(data: DeleteAccountRequest): Observable<any> {
    return this.http.delete(`${this.apiUrl}/account/my-account`, {
      body: data
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


}
