import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OilPrice, EnergyPrice } from '../models/market-data';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  private baseUrl = 'http://localhost:8089/api/market-data';

  constructor(private http: HttpClient) {}

  // Oil
  syncOil(start: string, end: string): Observable<any> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.post(`${this.baseUrl}/oil/sync`, {}, { params });
  }

  syncOilLatest(): Observable<any> {
    return this.http.post(`${this.baseUrl}/oil/sync-latest`, {});
  }

  getOilLatest(): Observable<OilPrice> {
    return this.http.get<OilPrice>(`${this.baseUrl}/oil/latest`);
  }

  getOilRange(start: string, end: string): Observable<OilPrice[]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<OilPrice[]>(`${this.baseUrl}/oil`, { params });
  }

  importOilCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/oil/import-csv`, formData);
  }

  // Energy
  syncEnergy(countryCode: string, start: string, end: string): Observable<any> {
    const params = new HttpParams().set('countryCode', countryCode).set('start', start).set('end', end);
    return this.http.post(`${this.baseUrl}/energy/sync`, {}, { params });
  }

  syncEnergyLatest(countryCode: string): Observable<any> {
    const params = new HttpParams().set('countryCode', countryCode);
    return this.http.post(`${this.baseUrl}/energy/sync-latest`, {}, { params });
  }

  getEnergyLatest(countryCode: string): Observable<EnergyPrice> {
    const params = new HttpParams().set('countryCode', countryCode);
    return this.http.get<EnergyPrice>(`${this.baseUrl}/energy/latest`, { params });
  }

  getEnergyRange(countryCode: string, start: string, end: string): Observable<EnergyPrice[]> {
    const params = new HttpParams().set('countryCode', countryCode).set('start', start).set('end', end);
    return this.http.get<EnergyPrice[]>(`${this.baseUrl}/energy`, { params });
  }

  importEnergyCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/energy/import-csv`, formData);
  }
}
