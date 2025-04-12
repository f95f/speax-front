import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { IUserResume } from '../../interfaces/iuser';
import { MessagingDataService } from '../../services/messaging-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private service: UsersService = inject(UsersService);
  private dataService: MessagingDataService = inject(MessagingDataService);
  private toast: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);
  
  userList: IUserResume[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    const observer = {
      next: (response: IUserResume[]) => {
        this.userList = response;
      },
      error: (error: any) => {
        console.error('Error loading users', error);
        this.toast.error('Error loading users', 'Error!');
      }
    }
    this.service.getUsers().subscribe(observer);
  }

  selectInvitee(id: string): void {
    this.dataService.setInviteeId(id);
  }
}
