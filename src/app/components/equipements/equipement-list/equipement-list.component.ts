import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipement } from 'src/app/models/equipement';
import { EquipementService } from 'src/app/services/equipement.service';

@Component({
  selector: 'app-equipement-list',
  templateUrl: './equipement-list.component.html',
  styleUrls: ['./equipement-list.component.css']
})
export class EquipementListComponent implements OnInit {

  equipements: Equipement[] = [];
  loading = true;
  errorMessage = '';

  constructor(private equipementService: EquipementService, private router: Router) {}

  ngOnInit(): void {
    this.loadEquipements();
  }

  loadEquipements(): void {
    this.loading = true;
    this.equipementService.getAll().subscribe({
      next: (data) => {
        this.equipements = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load equipements';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteEquipement(id: number): void {
    if (!confirm('Are you sure you want to delete this equipement?')) return;

    this.equipementService.delete(id).subscribe({
      next: () => this.loadEquipements(),
      error: (err) => {
        this.errorMessage = 'Failed to delete equipement';
        console.error(err);
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/equipements/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/equipements/edit', id]);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/equipements', id]);
  }
}
