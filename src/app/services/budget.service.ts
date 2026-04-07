import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetMonthly } from '../models/budget-monthly';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private baseUrl = 'http://localhost:8089/api/finance/budgets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BudgetMonthly[]> {
    return this.http.get<BudgetMonthly[]>(`${this.baseUrl}/getAll`);
  }

  getById(id: number): Observable<BudgetMonthly> {
    return this.http.get<BudgetMonthly>(`${this.baseUrl}/getById/${id}`);
  }

  create(budget: BudgetMonthly, siteId: number): Observable<BudgetMonthly> {
    return this.http.post<BudgetMonthly>(`${this.baseUrl}/create/${siteId}`, budget);
  }

  update(id: number, budget: BudgetMonthly): Observable<BudgetMonthly> {
    return this.http.put<BudgetMonthly>(`${this.baseUrl}/update/${id}`, budget);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getBySite(siteId: number): Observable<BudgetMonthly[]> {
    return this.http.get<BudgetMonthly[]>(`${this.baseUrl}/getBySite/${siteId}`);
  }
}
