import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { WeatherAdvisoryService } from 'src/app/services/weather-advisory.service';
import { WeatherRiskService } from 'src/app/services/weather-risk.service';
import { Site } from 'src/app/models/site';
import { WeatherData, WeatherAlert, WeatherRiskAssessment, WeatherSiteOverview, AlertStatus, Recommendation } from 'src/app/models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  sites: Site[] = [];
  selectedSiteId: number | null = null;

  overview: WeatherSiteOverview | null = null;
  weatherData: WeatherData[] = [];
  alerts: WeatherAlert[] = [];
  riskHistory: WeatherRiskAssessment[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';
  activeTab: 'overview' | 'data' | 'alerts' | 'risk' = 'overview';

  forecastDays = 7;
  historicalDays = 30;

  alertStatuses = Object.values(AlertStatus);

  constructor(
    private siteService: SiteService,
    private weatherDataService: WeatherDataService,
    private weatherAdvisoryService: WeatherAdvisoryService,
    private weatherRiskService: WeatherRiskService
  ) {}

  ngOnInit(): void {
    this.siteService.getAll().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error(err)
    });
  }

  loadOverview(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.errorMessage = '';
    this.weatherAdvisoryService.getOverview(this.selectedSiteId).subscribe({
      next: (data) => { this.overview = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load overview'; this.loading = false; console.error(err); }
    });
  }

  loadWeatherData(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.weatherDataService.getBySite(this.selectedSiteId).subscribe({
      next: (data) => { this.weatherData = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load weather data'; this.loading = false; console.error(err); }
    });
  }

  syncForecast(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.successMessage = '';
    this.weatherDataService.syncForecast(this.selectedSiteId, this.forecastDays).subscribe({
      next: (data) => { this.weatherData = data; this.successMessage = 'Forecast synced successfully'; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to sync forecast'; this.loading = false; console.error(err); }
    });
  }

  syncHistorical(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.successMessage = '';
    this.weatherDataService.syncHistorical(this.selectedSiteId, this.historicalDays).subscribe({
      next: (data) => { this.weatherData = data; this.successMessage = 'Historical data synced'; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to sync historical data'; this.loading = false; console.error(err); }
    });
  }

  loadAlerts(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.weatherAdvisoryService.getAlerts(this.selectedSiteId).subscribe({
      next: (data) => { this.alerts = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load alerts'; this.loading = false; console.error(err); }
    });
  }

  updateAlertStatus(alertId: number, status: AlertStatus): void {
    this.weatherAdvisoryService.updateAlertStatus(alertId, status).subscribe({
      next: () => { this.loadAlerts(); },
      error: (err) => { this.errorMessage = 'Failed to update alert'; console.error(err); }
    });
  }

  loadRiskHistory(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.weatherRiskService.getHistory(this.selectedSiteId).subscribe({
      next: (data) => { this.riskHistory = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load risk history'; this.loading = false; console.error(err); }
    });
  }

  assessRisk(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.weatherRiskService.assessLatest(this.selectedSiteId).subscribe({
      next: () => { this.successMessage = 'Risk assessed'; this.loadRiskHistory(); },
      error: (err) => { this.errorMessage = 'Failed to assess risk'; this.loading = false; console.error(err); }
    });
  }

  getAlertBadgeClass(status: string): string {
    switch (status) {
      case 'OPEN': return 'badge-danger';
      case 'ACKNOWLEDGED': return 'badge-warning';
      case 'RESOLVED': return 'badge-success';
      default: return '';
    }
  }
}
