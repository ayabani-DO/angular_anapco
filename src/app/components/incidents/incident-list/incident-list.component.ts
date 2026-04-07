import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from 'src/app/models/incident';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {

  incidents: Incident[] = [];
  sites: Site[] = [];
  selectedSiteId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(private siteService: SiteService, private router: Router) {}

  ngOnInit(): void {
    this.siteService.getAll().subscribe({
      next: (data: Site[]) => this.sites = data,
      error: (err: any) => console.error(err)
    });
  }

  loadIncidents(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.errorMessage = '';
    this.siteService.getIncidentsBySite(this.selectedSiteId).subscribe({
      next: (data: Incident[]) => {
        this.incidents = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load incidents for this site';
        this.loading = false;
        console.error(err);
      }
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/incidents', id]);
  }

  goToKpi(): void {
    this.router.navigate(['/dashboard-kpi']);
  }
}
