import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: Role[] = [];
  loading = true;
  errorMessage = '';
  newRoleName = '';
  addMessage = '';

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.roleService.getAll().subscribe({
      next: (data) => {
        this.roles = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load roles';
        this.loading = false;
        console.error(err);
      }
    });
  }

  addRole(): void {
    if (!this.newRoleName.trim()) return;

    this.roleService.add(this.newRoleName.trim()).subscribe({
      next: () => {
        this.addMessage = 'Role added successfully';
        this.newRoleName = '';
        this.loadRoles();
      },
      error: (err) => {
        this.addMessage = err.error?.message || 'Failed to add role';
        console.error(err);
      }
    });
  }
}
