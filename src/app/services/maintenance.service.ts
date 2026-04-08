import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private baseUrl = 'http://localhost:8089/api';

  constructor(private http: HttpClient) {}

  // Maintenance is accessed via equipment - these are convenience endpoints
  // The backend doesn't expose direct CRUD for maintenance, so we work through equipment

  getAll(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.baseUrl}/maintenance/getAll`);
  }

  getByEquipement(equipementId: number): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.baseUrl}/maintenance/getByEquipement/${equipementId}`);
  }
}
