import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipmentCostAnalysis, CostCategory } from '../models/equipment-cost';

@Injectable({
  providedIn: 'root'
})
export class EquipmentCostService {

  private apiUrl = 'http://localhost:8089/api';

  constructor(private http: HttpClient) {}

  getCostAnalysis(equipmentId: number): Observable<EquipmentCostAnalysis> {
    return this.http.get<EquipmentCostAnalysis>(`${this.apiUrl}/equipment/${equipmentId}/cost-analysis`);
  }

  getCostAnalysisBySite(siteId: number): Observable<EquipmentCostAnalysis[]> {
    return this.http.get<EquipmentCostAnalysis[]>(`${this.apiUrl}/sites/${siteId}/equipment-cost-analysis`);
  }

  getTopExpensive(limit: number = 10): Observable<EquipmentCostAnalysis[]> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<EquipmentCostAnalysis[]>(`${this.apiUrl}/equipment/cost/top-expensive`, { params });
  }

  getByCostCategory(): Observable<{ [key: string]: EquipmentCostAnalysis[] }> {
    return this.http.get<{ [key: string]: EquipmentCostAnalysis[] }>(`${this.apiUrl}/cost/by-category`);
  }

  getGlobalMonthlyCostTrend(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/cost/monthly-trend`);
  }
}
