import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatRequest, ChatResponse } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  private readonly baseUrl = `${environment.apiUrl}/api/assistant`;

  constructor(private http: HttpClient) {}

  ask(payload: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.baseUrl}/ask`, payload);
  }
}
