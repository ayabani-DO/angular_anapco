import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Site, StatusSites } from 'src/app/models/site';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css']
})
export class SiteFormComponent implements OnInit {

  siteForm!: FormGroup;
  isEditMode = false;
  siteId: number | null = null;
  loading = false;
  errorMessage = '';
  statusOptions = Object.values(StatusSites);

  constructor(
    private fb: FormBuilder,
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.siteId = +idParam;
      this.loadSite(this.siteId);
    }
  }

  private initForm(): void {
    this.siteForm = this.fb.group({
      codeRef: ['', Validators.required],
      nom: ['', Validators.required],
      latitude: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.required, Validators.min(-180), Validators.max(180)]],
      countryCode: ['', [Validators.required, Validators.maxLength(3)]],
      currencyCode: ['', [Validators.required, Validators.maxLength(3)]],
      statusSites: [StatusSites.ACTIF, Validators.required]
    });
  }

  private loadSite(id: number): void {
    this.loading = true;
    this.siteService.getById(id).subscribe({
      next: (site) => {
        this.siteForm.patchValue(site);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load site';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.siteForm.invalid) {
      this.siteForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const siteData: Site = this.siteForm.value;

    const request$ = this.isEditMode
      ? this.siteService.update(this.siteId!, siteData)
      : this.siteService.create(siteData);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/sites']);
      },
      error: (err) => {
        this.errorMessage = this.isEditMode ? 'Failed to update site' : 'Failed to create site';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/sites']);
  }
}
