import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieEquipement } from '../models/categorie-equipement';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private baseUrl = 'http://localhost:8089/api/categorie';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategorieEquipement[]> {
    return this.http.get<CategorieEquipement[]>(`${this.baseUrl}/getAllCategories`);
  }

  getById(id: number): Observable<CategorieEquipement> {
    return this.http.get<CategorieEquipement>(`${this.baseUrl}/getCategorieById/${id}`);
  }

  create(categorie: CategorieEquipement): Observable<CategorieEquipement> {
    return this.http.post<CategorieEquipement>(`${this.baseUrl}/createCategorie`, categorie);
  }

  update(id: number, categorie: CategorieEquipement): Observable<CategorieEquipement> {
    return this.http.put<CategorieEquipement>(`${this.baseUrl}/updateCategorie/${id}`, categorie);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCategorie/${id}`);
  }
}
