import { Component, OnInit } from '@angular/core';
import { EquipmentRulService } from 'src/app/services/equipment-rul.service';
import { EquipmentRul } from 'src/app/models/equipment-rul';
import { SiteService } from 'src/app/services/site.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-equipment-rul',
  templateUrl: './equipment-rul.component.html',
  styleUrls: ['./equipment-rul.component.css']
})
export class EquipmentRulComponent implements OnInit {

  sites: Site[] = [];
  selectedSiteId: number | null = null;

  rulData: EquipmentRul[] = [];
  highRiskData: EquipmentRul[] = [];

  loading = false;
  errorMessage = '';
  activeTab: 'site' | 'high-risk' = 'site';

  constructor(
    private rulService: EquipmentRulService,
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
    this.rulService.getRulBySite(this.selectedSiteId).subscribe({
      next: (data) => { this.rulData = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load RUL data'; this.loading = false; console.error(err); }
    });
  }

  loadHighRisk(): void {
    this.loading = true;
    this.errorMessage = '';
    this.rulService.getHighRiskEquipment().subscribe({
      next: (data) => { this.highRiskData = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load high-risk equipment'; this.loading = false; console.error(err); }
    });
  }

  getRulBadgeClass(category: string): string {
    switch (category) {
      case 'RUL_LONG': return 'badge-success';
      case 'RUL_MEDIUM': return 'badge-warning';
      case 'RUL_SHORT': return 'badge-danger';
      default: return '';
    }
  }
}
