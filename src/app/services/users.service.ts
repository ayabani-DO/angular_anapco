import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  idUser?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  accountLocked?: boolean;
  enabled?: boolean;
  createDate?: string;
  lastModifiedDate?: string;
  roles?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:8089/users';

  constructor(private http: HttpClient) {}

  getUserById(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getUserById/${idUser}`);
  }

  getAllUsersExceptMe(currentUserId: number): Observable<User[]> {
    const params = new HttpParams().set('currentUserId', currentUserId);
    return this.http.get<User[]>(`${this.baseUrl}/all-except-me`, { params });
  }

  assignRoleToUser(idUser: number, roleName: string): Observable<string> {
    const params = new HttpParams().set('roleName', roleName);
    return this.http.post(`${this.baseUrl}/${idUser}/assign-role`, {}, { params, responseType: 'text' });
  }

  assignAndReplaceRoleToUser(idUser: number, roleName: string): Observable<string> {
    const params = new HttpParams().set('roleName', roleName);
    return this.http.post(`${this.baseUrl}/${idUser}/assignAndReplaceRoleToUser`, {}, { params, responseType: 'text' });
  }

  banUser(idUser: number, lockStatus: boolean): Observable<string> {
    const params = new HttpParams().set('lockStatus', lockStatus);
    return this.http.put(`${this.baseUrl}/${idUser}/ban`, {}, { params, responseType: 'text' });
  }

  updateFullName(idUser: number, fullName: string): Observable<any> {
    const params = new HttpParams().set('fullName', fullName);
    return this.http.put<any>(`${this.baseUrl}/${idUser}/updateFullName`, {}, { params });
  }

  updateDateOfBirth(idUser: number, newDateOfBirth: string): Observable<any> {
    const params = new HttpParams().set('newDateOfBirth', newDateOfBirth);
    return this.http.put<any>(`${this.baseUrl}/${idUser}/updateDateOfBirth`, {}, { params });
  }
}
