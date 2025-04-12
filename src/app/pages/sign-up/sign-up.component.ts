import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { ISignUp } from '../../interfaces/iuser';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private service: UsersService = inject(UsersService);
  private authService: AuthService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  signUpForm!: FormGroup;
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    
    this.signUpForm = this.formBuilder.group({
      email: [[''], [Validators.required, Validators.email]],
      name: [[''], Validators.required],
      birthdate: [[''], Validators.required],
      password: ['123456'],
    });
  }


  onSubmit(): void {
    if(this.signUpForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const requestData: ISignUp = this.signUpForm.value;
    this.signUpForm.markAllAsTouched();
    const observer = {
      next: (response: any) => {
        this.toastr.success('User created successfully!', 'Success!');
        const loginRequest = { email: requestData.email, password: this.signUpForm.value.password };
        this.signIn(loginRequest.email, loginRequest.password);
        this.signUpForm.reset();
      },
      error: (error: any) => {
        console.error('Login failed', error);
      }
    }
    this.service.signUp(requestData).subscribe(observer);
  }


  signIn(email: string, password: string): void {

    const requestData = { email, password };

    const observer = {
      next: (response: any) => {
        console.log('Login successful', response);
        this.authService.processToken(response?.token);
        this.toastr.success('Login successful!', 'Success!');
        this.router.navigate(['/app/home']);
      },
      error: (error: any) => {
        console.error('Login failed', error);
      }
    }
    this.authService.login(requestData).subscribe(observer);
  }
}
