import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinanceKpi } from '../models/finance-kpi';

@Injectable({
  providedIn: 'root'
})
export class FinanceKpiService {

  private baseUrl = 'http://localhost:8089/api/finance/kpi';

  constructor(private http: HttpClient) {}

  getKpi(siteId: number, year: number, month: number): Observable<FinanceKpi> {
    const params = new HttpParams()
      .set('siteId', siteId).set('year', year).set('month', month);
    return this.http.get<FinanceKpi>(`${this.baseUrl}/get`, { params });
  }
}
