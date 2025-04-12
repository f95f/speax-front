import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { MessagingDataService } from '../../services/messaging-data.service';
import { IUser } from '../../interfaces/iuser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private service: UsersService = inject(UsersService);
  private toast: ToastrService = inject(ToastrService);
  private dataService: MessagingDataService = inject(MessagingDataService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  private subscriptions: Subscription[] = [];
  userDetails: IUser | null = null;


  ngOnInit(): void {
    this.subscriptions.push(

      this.dataService.getInviteeId().subscribe((id: string | null) => {
        id? this.getUserDetails(id) : this.return();
      }),

    );
  }


  getUserDetails(userId: string): void {
    const observer = {
      next: (response: IUser) => {
        this.userDetails = response;
      },
      error: (error: any) => {
        console.error('Error loading user details', error);
        this.toast.error('Error loading user details', 'Error!');
        this.return();
      }
    }
    this.service.getUserDetails(userId).subscribe(observer);
  }


  private return(): void {
    this.router.navigate(['/app/home']);
  }

  ngOnDestroy(): void {

  }
}
