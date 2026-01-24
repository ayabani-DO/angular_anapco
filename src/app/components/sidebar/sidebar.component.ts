import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userName = '';
  userRole = '';
  initials = '';
  toastr: any;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {


    const user = this.authService.getCurrentUser();

    if (user) {
      // email comme fallback
      this.userName = user.sub;

      // rôle
      this.userRole = user.roles?.[0] ?? 'USER';

      // initiales
      this.initials = this.buildInitials(this.userName);
    }
  }

  private buildInitials(value: string): string {
    return value
      .split(' ')
      .map(v => v[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  logout() {
    console.log("clicked");
    this.router.navigate(['/login']);
    this.authService.logout();
  
  
  }
}
