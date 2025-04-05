import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';
import { IUserResume } from '../interfaces/iuser';

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
  
}
