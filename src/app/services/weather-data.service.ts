import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private baseUrl = 'http://localhost:8089/api/weather-data';

  constructor(private http: HttpClient) {}

  syncForecast(siteId: number, daysAhead: number = 7): Observable<WeatherData[]> {
    const params = new HttpParams().set('daysAhead', daysAhead);
    return this.http.post<WeatherData[]>(`${this.baseUrl}/sites/${siteId}/sync/forecast`, {}, { params });
  }

  syncHistorical(siteId: number, daysBack: number = 30): Observable<WeatherData[]> {
    const params = new HttpParams().set('daysBack', daysBack);
    return this.http.post<WeatherData[]>(`${this.baseUrl}/sites/${siteId}/sync/historical`, {}, { params });
  }

  getBySite(siteId: number): Observable<WeatherData[]> {
    return this.http.get<WeatherData[]>(`${this.baseUrl}/sites/${siteId}`);
  }

  getLatestBySite(siteId: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.baseUrl}/sites/${siteId}/latest`);
  }
}
