import { Component, OnInit } from '@angular/core';
import { EquipmentCostService } from 'src/app/services/equipment-cost.service';
import { EquipmentCostAnalysis } from 'src/app/models/equipment-cost';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-equipment-cost',
  templateUrl: './equipment-cost.component.html',
  styleUrls: ['./equipment-cost.component.css']
})
export class EquipmentCostComponent implements OnInit {

  sites: Site[] = [];
  selectedSiteId: number | null = null;
  topLimit = 10;

  costData: EquipmentCostAnalysis[] = [];
  topExpensive: EquipmentCostAnalysis[] = [];
  monthlyCostTrend: { [key: string]: number } = {};

  loading = false;
  errorMessage = '';
  activeTab: 'site' | 'top' | 'trend' = 'site';

  constructor(
    private costService: EquipmentCostService,
    private siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.siteService.getAll().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error(err)
    });
  }

  loadBySite(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.errorMessage = '';
    this.costService.getCostAnalysisBySite(this.selectedSiteId).subscribe({
      next: (data) => { this.costData = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load cost analysis'; this.loading = false; console.error(err); }
    });
  }

  loadTopExpensive(): void {
    this.loading = true;
    this.errorMessage = '';
    this.costService.getTopExpensive(this.topLimit).subscribe({
      next: (data) => { this.topExpensive = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load top expensive'; this.loading = false; console.error(err); }
    });
  }

  loadMonthlyCostTrend(): void {
    this.loading = true;
    this.errorMessage = '';
    this.costService.getGlobalMonthlyCostTrend().subscribe({
      next: (data) => { this.monthlyCostTrend = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load cost trend'; this.loading = false; console.error(err); }
    });
  }

  trendEntries(): [string, number][] {
    return Object.entries(this.monthlyCostTrend).sort((a, b) => a[0].localeCompare(b[0]));
  }

  getCategoryBadgeClass(category: string): string {
    switch (category) {
      case 'LOW_COST': return 'badge-success';
      case 'MEDIUM_COST': return 'badge-warning';
      case 'HIGH_COST': return 'badge-danger';
      default: return '';
    }
  }
}
