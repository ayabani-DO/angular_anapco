import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../models/site';
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private baseUrl = 'http://localhost:8089/api/sites';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.baseUrl}/getAllSites`);
  }

  getById(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.baseUrl}/getSiteById/GetById/${id}`);
  }

  create(site: Site): Observable<Site> {
    return this.http.post<Site>(`${this.baseUrl}/createSite`, site);
  }

  update(id: number, site: Site): Observable<Site> {
    return this.http.put<Site>(`${this.baseUrl}/updateSite/${id}`, site);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteSite/${id}`);
  }

  getIncidentsBySite(siteId: number): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.baseUrl}/getIncidentsBySite/${siteId}/incidents`);
  }

  affectIncidentToSite(siteId: number, incidentId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/affectIncidentToSite/${siteId}/incident/${incidentId}`, {});
  }
}
