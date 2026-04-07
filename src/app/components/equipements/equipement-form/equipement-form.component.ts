import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipement, StatusEquipement } from 'src/app/models/equipement';
import { CategorieEquipement } from 'src/app/models/categorie-equipement';
import { EquipementService } from 'src/app/services/equipement.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-equipement-form',
  templateUrl: './equipement-form.component.html',
  styleUrls: ['./equipement-form.component.css']
})
export class EquipementFormComponent implements OnInit {

  equipementForm!: FormGroup;
  isEditMode = false;
  equipementId: number | null = null;
  loading = false;
  errorMessage = '';
  statusOptions = Object.values(StatusEquipement);
  categories: CategorieEquipement[] = [];
  sites: Site[] = [];

  constructor(
    private fb: FormBuilder,
    private equipementService: EquipementService,
    private categorieService: CategorieService,
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadSites();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.equipementId = +idParam;
      this.loadEquipement(this.equipementId);
    }
  }

  private initForm(): void {
    this.equipementForm = this.fb.group({
      nomEquipement: ['', Validators.required],
      refEquipement: ['', Validators.required],
      serialNumber: ['', Validators.required],
      statusEquipement: [StatusEquipement.ACTIF, Validators.required],
      categorieId: [null],
      siteId: [null]
    });
  }

  private loadEquipement(id: number): void {
    this.loading = true;
    this.equipementService.getById(id).subscribe({
      next: (eq) => {
        this.equipementForm.patchValue({
          nomEquipement: eq.nomEquipement,
          refEquipement: eq.refEquipement,
          serialNumber: eq.serialNumber,
          statusEquipement: eq.statusEquipement,
          categorieId: eq.categorie?.idCategorie || null,
          siteId: eq.site?.idSite || null
        });
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load equipement';
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

  private loadSites(): void {
    this.siteService.getAll().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.equipementForm.invalid) {
      this.equipementForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.equipementForm.value;

    const equipementData: Equipement = {
      nomEquipement: formValue.nomEquipement,
      refEquipement: formValue.refEquipement,
      serialNumber: formValue.serialNumber,
      statusEquipement: formValue.statusEquipement,
      categorie: formValue.categorieId ? { idCategorie: formValue.categorieId } as CategorieEquipement : undefined,
      site: formValue.siteId ? { idSite: formValue.siteId } as Site : undefined
    };

    const request$ = this.isEditMode
      ? this.equipementService.update(this.equipementId!, equipementData)
      : this.equipementService.create(equipementData);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/equipements']);
      },
      error: (err) => {
        this.errorMessage = this.isEditMode ? 'Failed to update equipement' : 'Failed to create equipement';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/equipements']);
  }
}
