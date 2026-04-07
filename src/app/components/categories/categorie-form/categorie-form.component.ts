import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieEquipement } from 'src/app/models/categorie-equipement';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css']
})
export class CategorieFormComponent implements OnInit {

  categorieForm!: FormGroup;
  isEditMode = false;
  categorieId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.categorieId = +idParam;
      this.loadCategorie(this.categorieId);
    }
  }

  private initForm(): void {
    this.categorieForm = this.fb.group({
      nomEquiepment: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  private loadCategorie(id: number): void {
    this.loading = true;
    this.categorieService.getById(id).subscribe({
      next: (cat) => {
        this.categorieForm.patchValue(cat);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load category';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.categorieForm.invalid) {
      this.categorieForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const categorieData: CategorieEquipement = this.categorieForm.value;

    const request$ = this.isEditMode
      ? this.categorieService.update(this.categorieId!, categorieData)
      : this.categorieService.create(categorieData);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        this.errorMessage = this.isEditMode ? 'Failed to update category' : 'Failed to create category';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }
}
