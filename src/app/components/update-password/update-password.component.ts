import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  errorMessage = '';
  successMessage = '';
  loading = false;

  passwordData = {
    email: '',
    currentPassword: '',
    newPassword: ''
  };
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.passwordData.email = user.sub;
    }
  }

  updatePassword(form: NgForm) {
    if (form.invalid) return;

    if (this.passwordData.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.authService.updatePassword(this.passwordData).subscribe({
      next: () => {
        this.successMessage = 'Password updated successfully';
        this.errorMessage = '';
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Failed to update password';
        this.successMessage = '';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
