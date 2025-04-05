import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { IUserResume } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private service: UsersService = inject(UsersService);
  private toast: ToastrService = inject(ToastrService);
  
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
}
