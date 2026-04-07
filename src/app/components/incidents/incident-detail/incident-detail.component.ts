import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from 'src/app/services/incident.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {

  incidents: Incident[] = [];
  sites: Site[] = [];
  selectedSiteId: number | null = null;
  loading = false;
  errorMessage = '';
  affectMessage = '';
  incidentIdToAffect: number | null = null;
  targetSiteId: number | null = null;

  constructor(
    private incidentService: IncidentService,
    private siteService: SiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.siteService.getAll().subscribe({
      next: (data: Site[]) => this.sites = data,
      error: (err: any) => console.error(err)
    });
  }

  loadIncidents(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.siteService.getIncidentsBySite(this.selectedSiteId).subscribe({
      next: (data: Incident[]) => { this.incidents = data; this.loading = false; },
      error: (err: any) => { this.errorMessage = 'Failed to load incidents'; this.loading = false; console.error(err); }
    });
  }

  affectToSite(): void {
    if (!this.incidentIdToAffect || !this.targetSiteId) return;
    this.incidentService.affectIncidentToSite(this.incidentIdToAffect, this.targetSiteId).subscribe({
      next: () => {
        this.affectMessage = 'Incident affected to site successfully';
        this.incidentIdToAffect = null;
        this.targetSiteId = null;
      },
      error: (err: any) => {
        this.affectMessage = 'Failed to affect incident to site';
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/incidents']);
  }
}
