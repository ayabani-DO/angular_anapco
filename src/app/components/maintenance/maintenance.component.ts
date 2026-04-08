import { Component, OnInit } from '@angular/core';
import { EquipementService } from 'src/app/services/equipement.service';
import { Equipement } from 'src/app/models/equipement';
import { Maintenance, TypeMaintenance, StatusMaintenance } from 'src/app/models/maintenance';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  equipements: Equipement[] = [];
  selectedEquipementId: number | null = null;
  maintenanceList: Maintenance[] = [];
  filteredList: Maintenance[] = [];

  typeFilter: string = '';
  statusFilter: string = '';

  types = Object.values(TypeMaintenance);
  statuses = Object.values(StatusMaintenance);

  loading = false;
  errorMessage = '';

  constructor(
    private equipementService: EquipementService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit(): void {
    this.equipementService.getAll().subscribe({
      next: (data) => this.equipements = data,
      error: (err) => console.error(err)
    });
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.errorMessage = '';
    this.maintenanceService.getAll().subscribe({
      next: (data) => {
        this.maintenanceList = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load maintenance records';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadByEquipement(): void {
    if (!this.selectedEquipementId) return;
    this.loading = true;
    this.errorMessage = '';
    this.maintenanceService.getByEquipement(this.selectedEquipementId).subscribe({
      next: (data) => {
        this.maintenanceList = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load maintenance for equipment';
        this.loading = false;
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    this.filteredList = this.maintenanceList.filter(m => {
      const matchType = !this.typeFilter || m.typeMaintenance === this.typeFilter;
      const matchStatus = !this.statusFilter || m.statusMaintenance === this.statusFilter;
      return matchType && matchStatus;
    });
  }

  getTypeBadgeClass(type: string): string {
    switch (type) {
      case 'PREVENTIVE': return 'badge-success';
      case 'CORRECTIVE': return 'badge-danger';
      case 'INSPECTION': return 'badge-info';
      default: return '';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'PLANNED': return 'badge-warning';
      case 'IN_PROGRESS': return 'badge-info';
      case 'DONE': return 'badge-success';
      default: return '';
    }
  }
}
