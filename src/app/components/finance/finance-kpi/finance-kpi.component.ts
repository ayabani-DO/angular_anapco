import { Component, OnInit } from '@angular/core';
import { FinanceKpi } from 'src/app/models/finance-kpi';
import { FinanceKpiService } from 'src/app/services/finance-kpi.service';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-finance-kpi',
  templateUrl: './finance-kpi.component.html',
  styleUrls: ['./finance-kpi.component.css']
})
export class FinanceKpiComponent implements OnInit {

  kpiData: FinanceKpi | null = null;
  sites: Site[] = [];
  selectedSiteId: number | null = null;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  loading = false;
  errorMessage = '';

  constructor(
    private financeKpiService: FinanceKpiService,
    private siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.loadSites();
  }

  private loadSites(): void {
    this.siteService.getAll().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error(err)
    });
  }

  loadKpi(): void {
    if (!this.selectedSiteId) return;

    this.loading = true;
    this.errorMessage = '';
    this.financeKpiService.getKpi(this.selectedSiteId, this.selectedYear, this.selectedMonth).subscribe({
      next: (data) => {
        this.kpiData = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load Finance KPI';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
