import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherRiskAssessment } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherRiskService {

  private baseUrl = 'http://localhost:8089/api/weather-risk';

  constructor(private http: HttpClient) {}

  assessLatest(siteId: number): Observable<WeatherRiskAssessment> {
    return this.http.post<WeatherRiskAssessment>(`${this.baseUrl}/sites/${siteId}/assess-latest`, {});
  }

  getLatest(siteId: number): Observable<WeatherRiskAssessment> {
    return this.http.get<WeatherRiskAssessment>(`${this.baseUrl}/sites/${siteId}/latest`);
  }

  getHistory(siteId: number): Observable<WeatherRiskAssessment[]> {
    return this.http.get<WeatherRiskAssessment[]>(`${this.baseUrl}/sites/${siteId}`);
  }
}
