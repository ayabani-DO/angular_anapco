import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidentService } from 'src/app/services/incident.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';
import { Incident } from 'src/app/models/incident';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css']
})
export class IncidentFormComponent implements OnInit {

  affectForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  sites: Site[] = [];
  incidents: Incident[] = [];
  selectedSiteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private siteService: SiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.affectForm = this.fb.group({
      incidentId: [null, Validators.required],
      siteId: [null, Validators.required]
    });
    this.loadSites();
  }

  private loadSites(): void {
    this.siteService.getAll().subscribe({
      next: (data: Site[]) => this.sites = data,
      error: (err: any) => console.error(err)
    });
  }

  loadIncidentsForSite(): void {
    if (!this.selectedSiteId) return;
    this.siteService.getIncidentsBySite(this.selectedSiteId).subscribe({
      next: (data: Incident[]) => this.incidents = data,
      error: (err: any) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.affectForm.invalid) {
      this.affectForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const fv = this.affectForm.value;

    this.incidentService.affectIncidentToSite(fv.incidentId, fv.siteId).subscribe({
      next: () => {
        this.successMessage = 'Incident affected to site successfully';
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to affect incident to site';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/incidents']);
  }
}
