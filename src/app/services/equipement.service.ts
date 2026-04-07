import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipement } from '../models/equipement';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  private baseUrl = 'http://localhost:8089/api/Equipement';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(`${this.baseUrl}/getAllEquipements`);
  }

  getById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`${this.baseUrl}/getEquipementById/${id}`);
  }

  create(equipement: Equipement): Observable<Equipement> {
    return this.http.post<Equipement>(`${this.baseUrl}/createEquipement`, equipement);
  }

  update(id: number, equipement: Equipement): Observable<Equipement> {
    return this.http.put<Equipement>(`${this.baseUrl}/updateEquipement/${id}`, equipement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteEquipement/${id}`);
  }

  affectToCategorie(equipementId: number, categorieId: number): Observable<Equipement> {
    return this.http.put<Equipement>(`http://localhost:8089/api/affectEquipementToCategorie/${equipementId}/categorie/${categorieId}`, {});
  }

  getByCategorie(categorieId: number): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(`http://localhost:8089/api/getEquipementsByCategorie/${categorieId}`);
  }
}
