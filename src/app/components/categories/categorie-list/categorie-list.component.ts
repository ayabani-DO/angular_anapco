import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieEquipement } from 'src/app/models/categorie-equipement';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  categories: CategorieEquipement[] = [];
  loading = true;
  errorMessage = '';

  constructor(private categorieService: CategorieService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteCategorie(id: number): void {
    if (!confirm('Are you sure you want to delete this category?')) return;

    this.categorieService.delete(id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => {
        this.errorMessage = 'Failed to delete category';
        console.error(err);
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/categories/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/categories/edit', id]);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/categories', id]);
  }
}
