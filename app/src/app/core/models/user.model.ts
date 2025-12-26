export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
}

export interface EditProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface DeleteAccountRequest {
  password: string;
}
