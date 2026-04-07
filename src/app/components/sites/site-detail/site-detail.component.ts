import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from 'src/app/models/site';
import { Incident } from 'src/app/models/incident';
import { SiteService } from 'src/app/services/site.service';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit {

  site: Site | null = null;
  incidents: Incident[] = [];
  loading = true;
  loadingIncidents = false;
  errorMessage = '';
  incidentIdToAffect: number | null = null;
  affectMessage = '';

  constructor(
    private siteService: SiteService,
    private incidentService: IncidentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSite(+id);
      this.loadIncidents(+id);
    }
  }

  private loadSite(id: number): void {
    this.siteService.getById(id).subscribe({
      next: (data) => {
        this.site = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load site details';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadIncidents(siteId: number): void {
    this.loadingIncidents = true;
    this.siteService.getIncidentsBySite(siteId).subscribe({
      next: (data) => {
        this.incidents = data;
        this.loadingIncidents = false;
      },
      error: (err) => {
        this.loadingIncidents = false;
        console.error(err);
      }
    });
  }

  affectIncident(): void {
    if (!this.site?.idSite || !this.incidentIdToAffect) return;

    this.incidentService.affectIncidentToSite(this.incidentIdToAffect, this.site.idSite).subscribe({
      next: () => {
        this.affectMessage = 'Incident affected successfully';
        this.incidentIdToAffect = null;
        this.loadIncidents(this.site!.idSite!);
      },
      error: (err) => {
        this.affectMessage = err.error?.message || 'Failed to affect incident';
        console.error(err);
      }
    });
  }

  goToEdit(): void {
    if (this.site?.idSite) {
      this.router.navigate(['/sites/edit', this.site.idSite]);
    }
  }

  goBack(): void {
    this.router.navigate(['/sites']);
  }

  deleteSite(): void {
    if (!this.site?.idSite) return;
    if (!confirm('Are you sure you want to delete this site?')) return;

    this.siteService.delete(this.site.idSite).subscribe({
      next: () => this.router.navigate(['/sites']),
      error: (err) => {
        this.errorMessage = 'Failed to delete site';
        console.error(err);
      }
    });
  }
}
