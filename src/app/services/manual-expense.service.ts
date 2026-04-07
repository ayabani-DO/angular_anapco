import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManualExpense } from '../models/manual-expense';

@Injectable({
  providedIn: 'root'
})
export class ManualExpenseService {

  private baseUrl = 'http://localhost:8089/api/finance/manual-expenses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ManualExpense[]> {
    return this.http.get<ManualExpense[]>(`${this.baseUrl}/getAll`);
  }

  getById(id: number): Observable<ManualExpense> {
    return this.http.get<ManualExpense>(`${this.baseUrl}/getById/${id}`);
  }

  create(expense: ManualExpense, siteId: number): Observable<ManualExpense> {
    return this.http.post<ManualExpense>(`${this.baseUrl}/create/${siteId}`, expense);
  }

  update(id: number, expense: ManualExpense): Observable<ManualExpense> {
    return this.http.put<ManualExpense>(`${this.baseUrl}/update/${id}`, expense);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getBySite(siteId: number): Observable<ManualExpense[]> {
    return this.http.get<ManualExpense[]>(`${this.baseUrl}/getBySite/${siteId}`);
  }

  getBySiteAndPeriod(siteId: number, start: string, end: string): Observable<ManualExpense[]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<ManualExpense[]>(`${this.baseUrl}/getBySiteAndPeriod/${siteId}`, { params });
  }
}
