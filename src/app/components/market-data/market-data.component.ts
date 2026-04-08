import { Component, OnInit } from '@angular/core';
import { MarketDataService } from 'src/app/services/market-data.service';
import { OilPrice, EnergyPrice } from 'src/app/models/market-data';

@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.css']
})
export class MarketDataComponent implements OnInit {

  activeTab: 'oil' | 'energy' = 'oil';

  oilPrices: OilPrice[] = [];
  energyPrices: EnergyPrice[] = [];
  latestOil: OilPrice | null = null;
  latestEnergy: EnergyPrice | null = null;

  oilStart = '';
  oilEnd = '';
  energyStart = '';
  energyEnd = '';
  countryCode = 'US';

  loading = false;
  errorMessage = '';
  successMessage = '';

  selectedFile: File | null = null;

  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    this.oilEnd = this.energyEnd = today.toISOString().split('T')[0];
    this.oilStart = this.energyStart = threeMonthsAgo.toISOString().split('T')[0];
  }

  // Oil
  loadOilLatest(): void {
    this.loading = true;
    this.clearMessages();
    this.marketDataService.getOilLatest().subscribe({
      next: (data) => { this.latestOil = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load latest oil price'; this.loading = false; console.error(err); }
    });
  }

  loadOilRange(): void {
    if (!this.oilStart || !this.oilEnd) return;
    this.loading = true;
    this.clearMessages();
    this.marketDataService.getOilRange(this.oilStart, this.oilEnd).subscribe({
      next: (data) => { this.oilPrices = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load oil prices'; this.loading = false; console.error(err); }
    });
  }

  syncOilLatest(): void {
    this.loading = true;
    this.clearMessages();
    this.marketDataService.syncOilLatest().subscribe({
      next: () => { this.successMessage = 'Oil data synced successfully'; this.loading = false; this.loadOilLatest(); },
      error: (err) => { this.errorMessage = 'Failed to sync oil data'; this.loading = false; console.error(err); }
    });
  }

  syncOilRange(): void {
    if (!this.oilStart || !this.oilEnd) return;
    this.loading = true;
    this.clearMessages();
    this.marketDataService.syncOil(this.oilStart, this.oilEnd).subscribe({
      next: () => { this.successMessage = 'Oil data synced for range'; this.loading = false; this.loadOilRange(); },
      error: (err) => { this.errorMessage = 'Failed to sync oil data'; this.loading = false; console.error(err); }
    });
  }

  // Energy
  loadEnergyLatest(): void {
    this.loading = true;
    this.clearMessages();
    this.marketDataService.getEnergyLatest(this.countryCode).subscribe({
      next: (data) => { this.latestEnergy = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load latest energy price'; this.loading = false; console.error(err); }
    });
  }

  loadEnergyRange(): void {
    if (!this.energyStart || !this.energyEnd) return;
    this.loading = true;
    this.clearMessages();
    this.marketDataService.getEnergyRange(this.countryCode, this.energyStart, this.energyEnd).subscribe({
      next: (data) => { this.energyPrices = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load energy prices'; this.loading = false; console.error(err); }
    });
  }

  syncEnergyLatest(): void {
    this.loading = true;
    this.clearMessages();
    this.marketDataService.syncEnergyLatest(this.countryCode).subscribe({
      next: () => { this.successMessage = 'Energy data synced'; this.loading = false; this.loadEnergyLatest(); },
      error: (err) => { this.errorMessage = 'Failed to sync energy data'; this.loading = false; console.error(err); }
    });
  }

  // CSV Import
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  importOilCsv(): void {
    if (!this.selectedFile) return;
    this.loading = true;
    this.clearMessages();
    this.marketDataService.importOilCsv(this.selectedFile).subscribe({
      next: () => { this.successMessage = 'Oil CSV imported'; this.loading = false; this.selectedFile = null; },
      error: (err) => { this.errorMessage = 'Failed to import CSV'; this.loading = false; console.error(err); }
    });
  }

  importEnergyCsv(): void {
    if (!this.selectedFile) return;
    this.loading = true;
    this.clearMessages();
    this.marketDataService.importEnergyCsv(this.selectedFile).subscribe({
      next: () => { this.successMessage = 'Energy CSV imported'; this.loading = false; this.selectedFile = null; },
      error: (err) => { this.errorMessage = 'Failed to import CSV'; this.loading = false; console.error(err); }
    });
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
