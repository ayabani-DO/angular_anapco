import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherAlert, Recommendation, WeatherSiteOverview, AlertStatus } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherAdvisoryService {

  private baseUrl = 'http://localhost:8089/api/weather-advisories';

  constructor(private http: HttpClient) {}

  getOverview(siteId: number): Observable<WeatherSiteOverview> {
    return this.http.get<WeatherSiteOverview>(`${this.baseUrl}/sites/${siteId}/overview`);
  }

  getAlerts(siteId: number, status?: AlertStatus): Observable<WeatherAlert[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<WeatherAlert[]>(`${this.baseUrl}/sites/${siteId}/alerts`, { params });
  }

  updateAlertStatus(alertId: number, status: AlertStatus): Observable<WeatherAlert> {
    const params = new HttpParams().set('status', status);
    return this.http.put<WeatherAlert>(`${this.baseUrl}/alerts/${alertId}/status`, {}, { params });
  }

  getRecommendations(siteId: number): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(`${this.baseUrl}/sites/${siteId}/recommendations`);
  }
}
