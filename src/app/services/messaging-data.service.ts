import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingDataService {

  private inviteeId = new BehaviorSubject<string | null>(null);

  getInviteeId(): Observable<string | null> {
    return this.inviteeId.asObservable();
  }

  setInviteeId(id: string): void {
    this.inviteeId.next(id);
  }
}
