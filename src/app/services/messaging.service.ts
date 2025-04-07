import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserResume } from '../interfaces/iuser';
import { UtilsService } from './utils.service';
import { IChat } from '../interfaces/ichat';
import { IMessage } from '../interfaces/imessage';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private http: HttpClient = inject(HttpClient);
  private utils: UtilsService = inject(UtilsService);

  private readonly chatUrl = `${environment.baseUrl}chats`;
  private readonly messageUrl = `${environment.baseUrl}messages`;


  public getChatsByUser(): Observable<IChat[]> {
    return this.http.get<IChat[]>(`${this.chatUrl}/list-by-user`);
  }

  public getMessagesByChat(chatId: string): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(`${this.messageUrl}/list-by-chat/${chatId}`);
  }

  public startChat(requestData: unknown): Observable<unknown> {
    return this.http.post<unknown>(`${this.chatUrl}/start-chat`, requestData);
  }

  public acceptChat(chatId: string): Observable<unknown> {
    return this.http.patch<unknown>(`${this.chatUrl}/accept/${chatId}`, {});
  }

  public sendMessage(message: unknown): Observable<unknown> {
    return this.http.post<unknown>(`${this.messageUrl}/send-message`, message);
  }

}