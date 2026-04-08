import { Component, OnInit } from '@angular/core';
import { UsersService, User } from 'src/app/services/users.service';
import { RoleService } from 'src/app/services/role.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  roles: Role[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';
  currentUserId: number | null = null;

  constructor(
    private usersService: UsersService,
    private roleService: RoleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userInfo = this.authService.getCurrentUser();
    this.currentUserId = userInfo?.userId || userInfo?.id || null;
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    if (!this.currentUserId) return;
    this.loading = true;
    this.usersService.getAllUsersExceptMe(this.currentUserId).subscribe({
      next: (data) => { this.users = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load users'; this.loading = false; console.error(err); }
    });
  }

  loadRoles(): void {
    this.roleService.getAll().subscribe({
      next: (data: Role[]) => this.roles = data,
      error: (err: any) => console.error(err)
    });
  }

  assignRole(userId: number, roleName: string): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.usersService.assignAndReplaceRoleToUser(userId, roleName).subscribe({
      next: () => { this.successMessage = 'Role assigned successfully'; this.loadUsers(); },
      error: (err) => { this.errorMessage = err.error || 'Failed to assign role'; console.error(err); }
    });
  }

  toggleBan(user: User): void {
    const newStatus = !user.accountLocked;
    this.successMessage = '';
    this.errorMessage = '';
    this.usersService.banUser(user.idUser!, newStatus).subscribe({
      next: () => {
        this.successMessage = newStatus ? 'User banned' : 'User unbanned';
        this.loadUsers();
      },
      error: (err) => { this.errorMessage = 'Failed to update ban status'; console.error(err); }
    });
  }

  getUserRoles(user: User): string {
    if (!user.roles || user.roles.length === 0) return 'No role';
    return user.roles.map((r: any) => r.name || r).join(', ');
  }
}
