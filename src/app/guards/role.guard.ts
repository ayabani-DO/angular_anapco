import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/login']);
    }

    const expectedRoles: string[] = route.data['roles'];
    if (!expectedRoles || expectedRoles.length === 0) {
      return true;
    }

    const user = this.authService.getCurrentUser();
    if (!user) {
      return this.router.createUrlTree(['/login']);
    }

    const userRoles: string[] = user.authorities || user.roles || [];
    const hasRole = expectedRoles.some(role => userRoles.includes(role));

    if (hasRole) {
      return true;
    }

    return this.router.createUrlTree(['/dashboard']);
  }
}
