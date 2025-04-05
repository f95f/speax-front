import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  
  public login(requestData: unknown): Observable<unknown> {
    console.log('Login request data:', requestData);
    throw new Error('Method not implemented.');
  }
}
