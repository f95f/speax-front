import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UtilsService } from './utils.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private utils: UtilsService = inject(UtilsService);
  private toast: ToastrService = inject(ToastrService);

  private readonly apiUrl = `${environment.baseUrl}sign-in`; 
  private tokenKey: string = 'token'; 
  interval: any
  public login(requestData: unknown): Observable<unknown> {
    return this.http.post<unknown>(this.apiUrl, requestData);
  }

  public processToken(token: string): void {
    if(this.isTokenValid(token)) {
      const decodedToken: { id: string } = jwtDecode(token);
      if(!decodedToken.id) {
        this.toast.error("Token is invalid", "Error");
        throw new Error("Token is invalid " + token);
      }
      
      this.utils.setOnClientStorage("userId", decodedToken.id);
      this.utils.setOnClientStorage(this.tokenKey, token);
    }
    else {
      this.toast.error("Token is invalid", "Error");
      console.error("Token is invalid", token);
    }
  }

  public getAuthToken(): string {
    const token = this.utils.getFromClientStorage(this.tokenKey);
    if(!token) {
      this.toast.warning("Token not found", "Warning");
      return '';
    }

    if(!this.isTokenValid(token)) {
      return '';
    }

    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      return decodedToken.exp > currentTime;
    } catch (error) {
      this.toast.error("Failed to decode token", "Error");
      console.error("Token decoding error", error);
      this.utils.clearClientStorage();
      return false;
    }
  }
    
}
