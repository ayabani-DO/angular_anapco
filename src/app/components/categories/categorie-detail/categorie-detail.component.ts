import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieEquipement } from 'src/app/models/categorie-equipement';
import { Equipement } from 'src/app/models/equipement';
import { CategorieService } from 'src/app/services/categorie.service';
import { EquipementService } from 'src/app/services/equipement.service';

@Component({
  selector: 'app-categorie-detail',
  templateUrl: './categorie-detail.component.html',
  styleUrls: ['./categorie-detail.component.css']
})
export class CategorieDetailComponent implements OnInit {

  categorie: CategorieEquipement | null = null;
  equipements: Equipement[] = [];
  loading = true;
  loadingEquipements = false;
  errorMessage = '';

  constructor(
    private categorieService: CategorieService,
    private equipementService: EquipementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCategorie(+id);
      this.loadEquipements(+id);
    }
  }

  private loadCategorie(id: number): void {
    this.categorieService.getById(id).subscribe({
      next: (data) => {
        this.categorie = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load category details';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadEquipements(categorieId: number): void {
    this.loadingEquipements = true;
    this.equipementService.getByCategorie(categorieId).subscribe({
      next: (data) => {
        this.equipements = data;
        this.loadingEquipements = false;
      },
      error: (err) => {
        this.loadingEquipements = false;
        console.error(err);
      }
    });
  }

  goToEdit(): void {
    if (this.categorie?.idCategorie) {
      this.router.navigate(['/categories/edit', this.categorie.idCategorie]);
    }
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }

  deleteCategorie(): void {
    if (!this.categorie?.idCategorie) return;
    if (!confirm('Are you sure you want to delete this category?')) return;

    this.categorieService.delete(this.categorie.idCategorie).subscribe({
      next: () => this.router.navigate(['/categories']),
      error: (err) => {
        this.errorMessage = 'Failed to delete category';
        console.error(err);
      }
    });
  }
}
