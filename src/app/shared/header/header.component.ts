import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UtilsService } from '../../services/utils.service';
import { IUserResume } from '../../interfaces/iuser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private service: UsersService = inject(UsersService);
  private utils: UtilsService = inject(UtilsService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  username: string = '';

  ngOnInit(): void {
    this.getUserName();
  }


  getUserName(): void {
    const userId = this.utils.getFromClientStorage("userId");
    if(!userId) return;

    const observer = {
      next: (response: IUserResume) => {
        this.username = response.name;
      },
      error: (error: any) => {
        console.error('Error loading username', error);
      }
    }
    this.service.getUserDetails(userId).subscribe(observer);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}
