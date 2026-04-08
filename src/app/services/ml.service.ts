import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MlPrediction, MlExplanation, MlHealth, MlFeature } from '../models/ml';

@Injectable({
  providedIn: 'root'
})
export class MlService {

  private baseUrl = 'http://localhost:8089/api/ml';

  constructor(private http: HttpClient) {}

  train(): Observable<any> {
    return this.http.post(`${this.baseUrl}/train`, {});
  }

  predictCost(siteId: number, year: number, month: number): Observable<MlPrediction> {
    return this.http.get<MlPrediction>(`${this.baseUrl}/predict/cost/${siteId}/${year}/${month}`);
  }

  predictRisk(siteId: number, year: number, month: number): Observable<MlPrediction> {
    return this.http.get<MlPrediction>(`${this.baseUrl}/predict/risk/${siteId}/${year}/${month}`);
  }

  explainCost(siteId: number, year: number, month: number): Observable<MlExplanation> {
    return this.http.get<MlExplanation>(`${this.baseUrl}/explain/cost/${siteId}/${year}/${month}`);
  }

  explainRisk(siteId: number, year: number, month: number): Observable<MlExplanation> {
    return this.http.get<MlExplanation>(`${this.baseUrl}/explain/risk/${siteId}/${year}/${month}`);
  }

  health(): Observable<MlHealth> {
    return this.http.get<MlHealth>(`${this.baseUrl}/health`);
  }

  // Features
  computeFeatures(year: number, month: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/features/compute/${year}/${month}`, {});
  }

  backfillTargets(): Observable<any> {
    return this.http.post(`${this.baseUrl}/features/backfill-targets`, {});
  }

  enrichMarketPrices(): Observable<any> {
    return this.http.post(`${this.baseUrl}/features/enrich-market-prices`, {});
  }

  getTrainingDataCost(): Observable<MlFeature[]> {
    return this.http.get<MlFeature[]>(`${this.baseUrl}/features/training-data/cost-forecast`);
  }

  getTrainingDataRisk(): Observable<MlFeature[]> {
    return this.http.get<MlFeature[]>(`${this.baseUrl}/features/training-data/risk-classification`);
  }

  getAllFeatures(): Observable<MlFeature[]> {
    return this.http.get<MlFeature[]>(`${this.baseUrl}/features/all`);
  }

  getFeaturesBySite(siteId: number): Observable<MlFeature[]> {
    return this.http.get<MlFeature[]>(`${this.baseUrl}/features/site/${siteId}`);
  }

  importFeaturesCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/features/import-csv`, formData);
  }
}
