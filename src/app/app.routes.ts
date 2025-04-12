import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'app', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'sign-in', component: LoginComponent },
];
