import { Component, inject } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { ToastrService } from 'ngx-toastr';
import { IMessage } from '../../interfaces/imessage';
import { IChat, IStartChatRequest } from '../../interfaces/ichat';
import { MessagingDataService } from '../../services/messaging-data.service';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  standalone: false,
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {
isAuthor(arg0: string|undefined,arg1: string|null) {
  return arg0 === arg1;
}
  private service: MessagingService = inject(MessagingService);
  private dataService: MessagingDataService = inject(MessagingDataService);
  private utils: UtilsService = inject(UtilsService);
  private toast: ToastrService = inject(ToastrService);
  private subscriptions: Subscription[] = [];

  private inviteeId: string | null = null;
  private interval: number = 1000;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  selectedChat: IChat | null = null;
  chatList: IChat[] = [];
  messageList: IMessage[] = [];
  message: string = '';
  userId: string | null = null;


  ngOnInit(): void {
    this.dataService.getInviteeId().subscribe((inviteeId: string | null) => {
      this.inviteeId = inviteeId;
      if(inviteeId) {
        this.startChat();
      }
    });

    this.userId = this.utils.getFromClientStorage("userId");
    this.getChats();

    this.intervalId = setInterval(() => { 
      this.getChats();
      this.getMessages();
    }, this.interval);

  }


  getChats(): void {
    if(!this.userId) return;

    const observer = {
      next: (response: IChat[]) => {
        this.chatList = response;
      },
      error: (error: any) => {
        console.error('Error loading chats', error);
        // this.toast.error('Error loading chats', 'Error!');
      }
    }
    this.service.getChatsByUser().subscribe(observer);
  }


  getMessages(): void {
    if(!this.selectedChat) return;
    const chatId = this.selectedChat.id;
    const observer = {
      next: (response: IMessage[]) => {
        this.messageList = response;
      },
      error: (error: any) => {
        console.error('Error loading messages', error);
        // this.toast.error('Error loading messages', 'Error!');
      }
    }
    this.service.getMessagesByChat(chatId).subscribe(observer);
  }


  selectChat(chat: IChat): void {
    this.selectedChat = chat;
    this.getMessages();
  }


  startChat(): void {
    if(!this.userId || !this.inviteeId) return;
    const chatRequest: IStartChatRequest = {
      inviterId: this.userId,
      inviteeId: this.inviteeId
    }

    const observer = {
      next: (response: any) => {
        this.selectedChat = response;
        this.getChats();
        this.toast.success('Chat started successfully', 'Success!');
      },
      error: (error: any) => {
        console.error('Error starting chat', error);
        this.toast.error('Error starting chat', 'Error!');
      }
    }
    this.service.startChat(chatRequest).subscribe(observer);
  }


  acceptChat(): void {
    if(!this.selectedChat) return;

    const observer = {
      next: (response: any) => {
        this.toast.success('Chat accepted successfully', 'Success!');
        this.getMessages();
        this.getChats();
      },
      error: (error: any) => {
        console.error('Error accepting chat', error);
        this.toast.error('Error accepting chat', 'Error!');
      }
    }
    this.service.acceptChat(this.selectedChat.id).subscribe(observer);
  }


  sendMessage(): void {
    if(!this.selectedChat || !this.message) return;

    const message: IMessage = {
      id: '0',
      chatId: this.selectedChat.id,
      content: this.message
    }

    const observer = {
      next: (response: any) => {
        this.getMessages();
      },
      error: (error: any) => {
        console.error('Error sending message', error);
        this.toast.error('Error sending message', 'Error!');
      }
    }
    this.service.sendMessage(message).subscribe(observer);
  }


  ngOnDestroy(): void {
    if(this.intervalId) clearInterval(this.intervalId);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
