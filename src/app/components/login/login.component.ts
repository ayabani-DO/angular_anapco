import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  currentForm: 'login' | 'forgot' | 'reset' = 'login';
  resetToken: string | null = null;
  errorMessage = '';
  successMessage = '';

  loginData = { email: '', password: ''};
  forgotData = { email: '' };
  resetData = { newPassword: '', confirmPassword: '' };
  toastr: any;

  constructor(private authService: AuthService,private router: Router) { }

  login(form: NgForm) {
    if (form.invalid) return;

    this.authService.authenticate(this.loginData).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.authService.saveToken(res.token);

        // ✅ redirect after login
        this.router.navigate(['/dashboard']);
        this.errorMessage = '';
        this.successMessage = 'Login successful';
        console.log("login success");
        
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Login failed';
        this.successMessage = '';
      }
    });
  }

  forgotPassword(form: NgForm) {
    if (form.invalid) return;

    this.authService.forgotPassword(this.forgotData.email).subscribe({
      next: () => {
        this.successMessage = 'Password reset link sent to your email';
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Error sending reset link';
        this.successMessage = '';
      }
    });
  }

  resetPassword(form: NgForm) {
    if (form.invalid) return;

    if (this.resetData.newPassword !== this.resetData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.resetToken) {
      this.errorMessage = 'Invalid or missing token';
      return;
    }

    this.authService.resetPassword(this.resetToken, this.resetData.newPassword).subscribe({
      next: () => {
        this.successMessage = 'Password has been reset successfully';
        this.errorMessage = '';
        this.currentForm = 'login';
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Reset password failed';
        this.successMessage = '';
      }
    });
  }

  showForm(form: 'login' | 'forgot') {
    this.currentForm = form;
    this.errorMessage = '';
    this.successMessage = '';
  }


  
}
