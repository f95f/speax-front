import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private service: AuthService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [[''], [Validators.required, Validators.email]],
      password: [[''], Validators.required]
    });
  }


  onSubmit(): void {
    if(this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const requestData: { email: string, password: string } = this.loginForm.value;
    this.loginForm.markAllAsTouched();
    const observer = {
      next: (response: any) => {
        console.log('Login successful', response);
      },
      error: (error: any) => {
        console.error('Login failed', error);
      }
    }
    this.service.login(requestData).subscribe(observer);
  }
}
