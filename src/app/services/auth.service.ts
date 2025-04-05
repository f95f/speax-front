import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAuthToken(): string {
      return "a 'token"
  }

  private http: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.baseUrl}sign-in`; 
  
  
  public login(requestData: unknown): Observable<unknown> {
    return this.http.post<unknown>(this.apiUrl, requestData);
  }
}
