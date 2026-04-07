import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipement } from 'src/app/models/equipement';
import { EquipementService } from 'src/app/services/equipement.service';
import { CategorieEquipement } from 'src/app/models/categorie-equipement';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-equipement-detail',
  templateUrl: './equipement-detail.component.html',
  styleUrls: ['./equipement-detail.component.css']
})
export class EquipementDetailComponent implements OnInit {

  equipement: Equipement | null = null;
  loading = true;
  errorMessage = '';
  categories: CategorieEquipement[] = [];
  selectedCategorieId: number | null = null;
  affectMessage = '';

  constructor(
    private equipementService: EquipementService,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEquipement(+id);
      this.loadCategories();
    }
  }

  private loadEquipement(id: number): void {
    this.equipementService.getById(id).subscribe({
      next: (data) => {
        this.equipement = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load equipement details';
        this.loading = false;
        console.error(err);
      }
    });
  }

  private loadCategories(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  affectToCategorie(): void {
    if (!this.equipement?.idEquipement || !this.selectedCategorieId) return;

    this.equipementService.affectToCategorie(this.equipement.idEquipement, this.selectedCategorieId).subscribe({
      next: () => {
        this.affectMessage = 'Category affected successfully';
        this.selectedCategorieId = null;
        this.loadEquipement(this.equipement!.idEquipement!);
      },
      error: (err) => {
        this.affectMessage = err.error?.message || 'Failed to affect category';
        console.error(err);
      }
    });
  }

  goToEdit(): void {
    if (this.equipement?.idEquipement) {
      this.router.navigate(['/equipements/edit', this.equipement.idEquipement]);
    }
  }

  goBack(): void {
    this.router.navigate(['/equipements']);
  }

  deleteEquipement(): void {
    if (!this.equipement?.idEquipement) return;
    if (!confirm('Are you sure you want to delete this equipement?')) return;

    this.equipementService.delete(this.equipement.idEquipement).subscribe({
      next: () => this.router.navigate(['/equipements']),
      error: (err) => {
        this.errorMessage = 'Failed to delete equipement';
        console.error(err);
      }
    });
  }
}
