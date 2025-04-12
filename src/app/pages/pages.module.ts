import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    UserListComponent,
    ChatListComponent,
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
  ]
})
export class PagesModule { }
