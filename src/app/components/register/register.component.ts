import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage = '';
  successMessage = '';

  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: ''
  };
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(form: NgForm) {
    if (form.invalid) return;

    if (this.registerData.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Please check your email to activate your account.';
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Registration failed';
        this.successMessage = '';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
