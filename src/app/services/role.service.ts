import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8089/roles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/getRoles`);
  }

  add(name: string): Observable<Role> {
    const params = new HttpParams().set('name', name);
    return this.http.post<Role>(`${this.baseUrl}/add`, {}, { params });
  }
}
