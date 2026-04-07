import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident';
import {
  SeverityKpi, LifecycleKpi, CostAnalysisKpi, RecurrenceKpi,
  RiskScore, IncidentDashboard, TrendData, SiteComparison
} from '../models/incident-kpi';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private baseUrl = 'http://localhost:8089/api/incidents';

  constructor(private http: HttpClient) {}

  // NOTE: Backend IncidentController has NO CRUD endpoints.
  // Incidents are accessed via SiteService.getIncidentsBySite()

  affectIncidentToSite(incidentId: number, siteId: number): Observable<Incident> {
    return this.http.post<Incident>(`${this.baseUrl}/affectIncidentToSite/${incidentId}/site/${siteId}`, {});
  }

  // ── KPI endpoints ──

  kpiSeverity(siteId: number, year: number, month: number): Observable<SeverityKpi> {
    const params = new HttpParams()
      .set('siteId', siteId).set('year', year).set('month', month);
    return this.http.get<SeverityKpi>(`${this.baseUrl}/kpi/severity`, { params });
  }

  kpiLifecycle(siteId: number, year: number, month: number): Observable<LifecycleKpi> {
    const params = new HttpParams()
      .set('siteId', siteId).set('year', year).set('month', month);
    return this.http.get<LifecycleKpi>(`${this.baseUrl}/kpi/lifecycle`, { params });
  }

  kpiCostAnalysis(siteId: number, year: number, month: number, targetCurrency: string): Observable<CostAnalysisKpi> {
    const params = new HttpParams()
      .set('siteId', siteId).set('year', year).set('month', month).set('targetCurrency', targetCurrency);
    return this.http.get<CostAnalysisKpi>(`${this.baseUrl}/kpi/cost-analysis`, { params });
  }

  kpiRecurrence(siteId: number, days: number): Observable<RecurrenceKpi> {
    const params = new HttpParams().set('siteId', siteId).set('days', days);
    return this.http.get<RecurrenceKpi>(`${this.baseUrl}/kpi/recurrence`, { params });
  }

  riskScoreSite(siteId: number): Observable<RiskScore> {
    return this.http.get<RiskScore>(`${this.baseUrl}/kpi/risk-score/site/${siteId}`);
  }

  riskScoreEquipment(equipmentId: number): Observable<RiskScore> {
    return this.http.get<RiskScore>(`${this.baseUrl}/kpi/risk-score/equipment/${equipmentId}`);
  }

  dashboard(siteId: number, year: number, month: number, targetCurrency: string): Observable<IncidentDashboard> {
    const params = new HttpParams()
      .set('year', year).set('month', month).set('targetCurrency', targetCurrency);
    return this.http.get<IncidentDashboard>(`${this.baseUrl}/kpi/dashboard/${siteId}`, { params });
  }

  trend(siteId: number, months: number): Observable<TrendData> {
    const params = new HttpParams().set('months', months);
    return this.http.get<TrendData>(`${this.baseUrl}/kpi/trend/${siteId}`, { params });
  }

  compareSites(siteIds: number[], year: number, month: number): Observable<SiteComparison> {
    const params = new HttpParams()
      .set('siteIds', siteIds.join(',')).set('year', year).set('month', month);
    return this.http.get<SiteComparison>(`${this.baseUrl}/kpi/compare/sites`, { params });
  }
}
