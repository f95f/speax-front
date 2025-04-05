import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { ChatListComponent } from './chat-list/chat-list.component';


@NgModule({
  declarations: [
    LoginComponent,
    UserListComponent,
    ChatListComponent,
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
  ]
})
export class PagesModule { }
