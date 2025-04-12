import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';
import { ISignUp, IUserResume } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http: HttpClient = inject(HttpClient);
  private utils: UtilsService = inject(UtilsService);

  private readonly apiUrl = `${environment.baseUrl}users`;

  public getUsers(): Observable<IUserResume[]> {
    return this.http.get<IUserResume[]>(this.apiUrl);
  }
  
  public getUserDetails(userId: string): Observable<IUserResume> {
    return this.http.get<IUserResume>(`${this.apiUrl}/${userId}`);
  }

  public signUp(requestData: ISignUp): Observable<IUserResume> {
    return this.http.post<IUserResume>(`${this.apiUrl}/sign-up`, requestData);
  }
}
