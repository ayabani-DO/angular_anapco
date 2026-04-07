import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipmentRul } from '../models/equipment-rul';

@Injectable({
  providedIn: 'root'
})
export class EquipmentRulService {

  private apiUrl = 'http://localhost:8089/api';

  constructor(private http: HttpClient) {}

  getRul(equipmentId: number): Observable<EquipmentRul> {
    return this.http.get<EquipmentRul>(`${this.apiUrl}/equipment/${equipmentId}/rul`);
  }

  getRulBySite(siteId: number): Observable<EquipmentRul[]> {
    return this.http.get<EquipmentRul[]>(`${this.apiUrl}/sites/${siteId}/equipment-rul`);
  }

  getHighRiskEquipment(): Observable<EquipmentRul[]> {
    return this.http.get<EquipmentRul[]>(`${this.apiUrl}/equipment/rul/high-risk`);
  }
}
