import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';
import { IncidentDashboard, TrendData, RiskScore } from 'src/app/models/incident-kpi';

@Component({
  selector: 'app-dashboard-kpi',
  templateUrl: './dashboard-kpi.component.html',
  styleUrls: ['./dashboard-kpi.component.css']
})
export class DashboardKpiComponent implements OnInit {

  sites: Site[] = [];
  selectedSiteId: number | null = null;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  targetCurrency = 'USD';
  trendMonths = 6;

  dashboardData: IncidentDashboard | null = null;
  trendData: TrendData | null = null;
  riskScore: RiskScore | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private incidentService: IncidentService,
    private siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.siteService.getAll().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error(err)
    });
  }

  loadDashboard(): void {
    if (!this.selectedSiteId) return;

    this.loading = true;
    this.errorMessage = '';
    this.dashboardData = null;
    this.trendData = null;
    this.riskScore = null;

    this.incidentService.dashboard(this.selectedSiteId, this.selectedYear, this.selectedMonth, this.targetCurrency).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load dashboard';
        this.loading = false;
        console.error(err);
      }
    });

    this.incidentService.trend(this.selectedSiteId, this.trendMonths).subscribe({
      next: (data) => this.trendData = data,
      error: (err) => console.error(err)
    });

    this.incidentService.riskScoreSite(this.selectedSiteId).subscribe({
      next: (data) => this.riskScore = data,
      error: (err) => console.error(err)
    });
  }
}
