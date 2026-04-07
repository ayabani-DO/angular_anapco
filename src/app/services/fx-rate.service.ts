import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FxRate } from '../models/fx-rate';

@Injectable({
  providedIn: 'root'
})
export class FxRateService {

  private baseUrl = 'http://localhost:8089/api/finance/fx-rates';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FxRate[]> {
    return this.http.get<FxRate[]>(`${this.baseUrl}/getAll`);
  }

  getById(id: number): Observable<FxRate> {
    return this.http.get<FxRate>(`${this.baseUrl}/getById/${id}`);
  }

  create(fxRate: FxRate): Observable<FxRate> {
    return this.http.post<FxRate>(`${this.baseUrl}/create`, fxRate);
  }

  update(id: number, fxRate: FxRate): Observable<FxRate> {
    return this.http.put<FxRate>(`${this.baseUrl}/update/${id}`, fxRate);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getByYearMonth(year: number, month: number, fromCurrency: string, toCurrency: string): Observable<FxRate> {
    const params = new HttpParams()
      .set('year', year).set('month', month)
      .set('fromCurrency', fromCurrency).set('toCurrency', toCurrency);
    return this.http.get<FxRate>(`${this.baseUrl}/getByYearMonth`, { params });
  }

  fetchLatest(toCurrency: string): Observable<FxRate> {
    const params = new HttpParams().set('toCurrency', toCurrency);
    return this.http.post<FxRate>(`${this.baseUrl}/fetch/latest`, {}, { params });
  }

  fetchHistorical(toCurrency: string, date: string): Observable<FxRate> {
    const params = new HttpParams().set('toCurrency', toCurrency).set('date', date);
    return this.http.post<FxRate>(`${this.baseUrl}/fetch/historical`, {}, { params });
  }

  convert(amount: number, from: string, to: string, year: number, month: number): Observable<number> {
    const params = new HttpParams()
      .set('amount', amount).set('from', from).set('to', to)
      .set('year', year).set('month', month);
    return this.http.get<number>(`${this.baseUrl}/convert`, { params });
  }
}
