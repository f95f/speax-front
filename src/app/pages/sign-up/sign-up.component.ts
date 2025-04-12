import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { ISignUp } from '../../interfaces/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private service: UsersService = inject(UsersService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  signUpForm!: FormGroup;
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    
    this.signUpForm = this.formBuilder.group({
      email: [[''], [Validators.required, Validators.email]],
      name: [[''], Validators.required],
      birthdate: [[''], Validators.required]
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
      },
      error: (error: any) => {
        console.error('Login failed', error);
      }
    }
    this.service.signUp(requestData).subscribe(observer);
  }


}
