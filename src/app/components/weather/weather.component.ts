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
      next: (data: any) => { this.overview = this.normalizeOverview(data); this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load overview'; this.loading = false; console.error(err); }
    });
  }

  loadWeatherData(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.weatherDataService.getBySite(this.selectedSiteId).subscribe({
      next: (data: any[]) => { this.weatherData = data.map(d => this.normalizeWeatherData(d)); this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load weather data'; this.loading = false; console.error(err); }
    });
  }

  syncForecast(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.successMessage = '';
    this.weatherDataService.syncForecast(this.selectedSiteId, this.forecastDays).subscribe({
      next: (data: any[]) => { this.weatherData = data.map(d => this.normalizeWeatherData(d)); this.successMessage = 'Forecast synced successfully'; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to sync forecast'; this.loading = false; console.error(err); }
    });
  }

  syncHistorical(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.successMessage = '';
    this.weatherDataService.syncHistorical(this.selectedSiteId, this.historicalDays).subscribe({
      next: (data: any[]) => { this.weatherData = data.map(d => this.normalizeWeatherData(d)); this.successMessage = 'Historical data synced'; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to sync historical data'; this.loading = false; console.error(err); }
    });
  }

  loadAlerts(): void {
    if (!this.selectedSiteId) return;
    this.loading = true;
    this.weatherAdvisoryService.getAlerts(this.selectedSiteId).subscribe({
      next: (data: any[]) => {
        this.alerts = data.map((a: any) => ({
          id: a.id,
          siteId: a.siteId ?? a.site_id ?? 0,
          alertType: a.alertType ?? a.alert_type ?? a.type ?? '',
          severity: a.severity ?? a.level ?? '',
          message: a.message ?? a.description ?? a.content ?? a.text ?? '',
          status: a.status ?? 'OPEN',
          createdAt: a.createdAt ?? a.created_at
        }));
        this.loading = false;
      },
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
      next: (data: any[]) => {
        this.riskHistory = data.map((r: any) => ({
          siteId: r.siteId ?? r.site_id ?? 0,
          riskScore: r.riskScore ?? r.risk_score ?? r.score,
          riskLevel: r.riskLevel ?? r.risk_level ?? r.level,
          details: r.details ?? r.description ?? r.message ?? '',
          assessedAt: r.assessedAt ?? r.assessed_at ?? r.createdAt
        }));
        this.loading = false;
      },
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

  private normalizeWeatherData(raw: any): WeatherData {
    return {
      id: raw.id,
      siteId: raw.siteId ?? raw.site_id ?? 0,
      date: raw.date ?? raw.recordDate ?? raw.record_date ?? '',
      temperature: raw.temperature ?? raw.temp ?? raw.temperature2m ?? raw.temperature_2m ?? raw.temperatureCelsius,
      humidity: raw.humidity ?? raw.relativeHumidity ?? raw.relative_humidity ?? raw.relativeHumidity2m,
      windSpeed: raw.windSpeed ?? raw.wind_speed ?? raw.windSpeedKmh ?? raw.windSpeed10m ?? raw.wind_speed_10m,
      precipitation: raw.precipitation ?? raw.precipitationMm ?? raw.precipitation_sum ?? raw.rain,
      pressure: raw.pressure ?? raw.surfacePressure ?? raw.surface_pressure ?? raw.pressureHpa,
      weatherCode: raw.weatherCode ?? raw.weather_code ?? raw.weathercode,
      source: raw.source ?? raw.dataSource ?? raw.data_source
    };
  }

  private normalizeOverview(data: any): WeatherSiteOverview {
    const raw = data.latestWeatherData ?? data.latest_weather_data ?? data.weatherData ?? data.weather_data;
    let wd: WeatherData | undefined;
    if (raw) {
      wd = {
        siteId: raw.siteId ?? raw.site_id ?? 0,
        date: raw.date ?? raw.recordDate ?? raw.record_date ?? '',
        temperature: raw.temperature ?? raw.temp ?? raw.temperature2m ?? raw.temperature_2m ?? raw.temperatureCelsius,
        humidity: raw.humidity ?? raw.relativeHumidity ?? raw.relative_humidity ?? raw.relativeHumidity2m ?? raw.humidity_percent,
        windSpeed: raw.windSpeed ?? raw.wind_speed ?? raw.windSpeedKmh ?? raw.windSpeed10m ?? raw.wind_speed_10m,
        precipitation: raw.precipitation ?? raw.precipitationMm ?? raw.precipitation_sum ?? raw.rain,
        pressure: raw.pressure ?? raw.surfacePressure ?? raw.surface_pressure ?? raw.pressureHpa,
        weatherCode: raw.weatherCode ?? raw.weather_code ?? raw.weathercode,
        source: raw.source ?? raw.dataSource ?? raw.data_source
      };
    }

    const rawAssessment = data.latestAssessment ?? data.latest_assessment ?? data.latestRiskAssessment;
    let assessment: WeatherRiskAssessment | undefined;
    if (rawAssessment) {
      assessment = {
        siteId: rawAssessment.siteId ?? rawAssessment.site_id ?? 0,
        riskScore: rawAssessment.riskScore ?? rawAssessment.risk_score ?? rawAssessment.score,
        riskLevel: rawAssessment.riskLevel ?? rawAssessment.risk_level ?? rawAssessment.level,
        details: rawAssessment.details ?? rawAssessment.description ?? rawAssessment.message ?? rawAssessment.detail,
        assessedAt: rawAssessment.assessedAt ?? rawAssessment.assessed_at ?? rawAssessment.createdAt
      };
    }

    const rawAlerts: any[] = data.alerts ?? data.activeAlerts ?? data.active_alerts ?? [];
    const alerts: WeatherAlert[] = rawAlerts.map((a: any) => ({
      id: a.id,
      siteId: a.siteId ?? a.site_id ?? 0,
      alertType: a.alertType ?? a.alert_type ?? a.type ?? '',
      severity: a.severity ?? a.level ?? '',
      message: a.message ?? a.description ?? a.content ?? a.text ?? a.alertMessage ?? a.alert_message ?? '',
      status: a.status ?? 'OPEN',
      createdAt: a.createdAt ?? a.created_at
    }));

    const rawRecs: any[] = data.recommendations ?? data.advisories ?? [];
    const recommendations: Recommendation[] = rawRecs.map((r: any) => ({
      id: r.id,
      siteId: r.siteId ?? r.site_id ?? 0,
      message: r.message ?? r.description ?? r.content ?? r.text ?? r.recommendation ?? r.advisoryMessage ?? r.advisory_message ?? '',
      priority: r.priority ?? r.level ?? r.severity ?? '',
      createdAt: r.createdAt ?? r.created_at
    }));

    return {
      siteId: data.siteId ?? data.site_id ?? 0,
      latestWeatherData: wd,
      latestAssessment: assessment,
      alerts,
      recommendations
    };
  }
}
