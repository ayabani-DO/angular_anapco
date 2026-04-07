import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FxRate } from 'src/app/models/fx-rate';
import { FxRateService } from 'src/app/services/fx-rate.service';

@Component({
  selector: 'app-fxrate-list',
  templateUrl: './fxrate-list.component.html',
  styleUrls: ['./fxrate-list.component.css']
})
export class FxrateListComponent implements OnInit {

  fxRates: FxRate[] = [];
  loading = true;
  errorMessage = '';
  fetchCurrency = '';
  fetchDate = '';
  fetchMessage = '';
  validCurrencies = ['EUR','USD','GBP','MAD','TND','JPY','CHF','CAD','AUD','CNY','INR','BRL','ZAR','SEK','NOK','DKK','PLN','CZK','HUF','RON','BGN','HRK','RUB','TRY','MXN','SGD','HKD','KRW','NZD','THB'];

  constructor(private fxRateService: FxRateService, private router: Router) {}

  ngOnInit(): void {
    this.loadFxRates();
  }

  loadFxRates(): void {
    this.loading = true;
    this.fxRateService.getAll().subscribe({
      next: (data) => {
        this.fxRates = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load FX rates';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteFxRate(id: number): void {
    if (!confirm('Delete this FX rate?')) return;
    this.fxRateService.delete(id).subscribe({
      next: () => this.loadFxRates(),
      error: (err) => {
        this.errorMessage = 'Failed to delete FX rate';
        console.error(err);
      }
    });
  }

  fetchLatest(): void {
    if (!this.fetchCurrency) return;
    this.fxRateService.fetchLatest(this.fetchCurrency).subscribe({
      next: () => {
        this.fetchMessage = 'Latest rate fetched successfully';
        this.loadFxRates();
      },
      error: (err) => {
        this.fetchMessage = 'Failed to fetch latest rate';
        console.error(err);
      }
    });
  }

  fetchHistorical(): void {
    if (!this.fetchCurrency || !this.fetchDate) return;
    this.fxRateService.fetchHistorical(this.fetchCurrency, this.fetchDate).subscribe({
      next: () => {
        this.fetchMessage = 'Historical rate fetched successfully';
        this.loadFxRates();
      },
      error: (err) => {
        this.fetchMessage = 'Failed to fetch historical rate';
        console.error(err);
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/finance/fx-rates/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/finance/fx-rates/edit', id]);
  }
}
