import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  AuthenficationRequest,
  AuthenficationResponse,
  RegistrationRequest,
  ResetPasswordDto
} from '../models/auth';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8089/auth';
  private readonly TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient,private router:Router) {}

  // ================= AUTH =================

  register(request: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`, request);
  }

  authenticate(request: AuthenficationRequest): Observable<AuthenficationResponse> {
    return this.http.post<AuthenficationResponse>(
      `${this.baseUrl}/authenticate`,
      request
    );
  }

  authenticateWithGoogle(googleToken: string): Observable<AuthenficationResponse> {
    return this.http.post<AuthenficationResponse>(
      `${this.baseUrl}/google?googleToken=${googleToken}`,
      {}
    );
  }

  activateAccount(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/activate-account?token=${token}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password?email=${email}`, {});
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/reset-password?token=${token}&newPassword=${newPassword}`,
      {}
    );
  }

  updatePassword(resetPasswordDto: ResetPasswordDto): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/update-password`,
      resetPasswordDto
    );
  }

  // ================= TOKEN =================

    saveToken(token: string): void {
      localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
      return localStorage.getItem(this.TOKEN_KEY);
    }

    logout(): void {
      localStorage.removeItem(this.TOKEN_KEY);
      
    }

    isLoggedIn(): boolean {
      return !!this.getToken();
    }

  // ================= USER FROM JWT =================

  getCurrentUser(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<any>(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
