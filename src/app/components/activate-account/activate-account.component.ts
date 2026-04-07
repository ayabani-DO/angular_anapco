import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  loading = true;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.activateAccount(token);
    } else {
      this.errorMessage = 'Invalid or missing activation token';
      this.loading = false;
    }
  }

  private activateAccount(token: string): void {
    this.authService.activateAccount(token).subscribe({
      next: () => {
        this.successMessage = 'Your account has been activated successfully! You can now login.';
        this.errorMessage = '';
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Account activation failed';
        this.successMessage = '';
        this.loading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
