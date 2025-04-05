import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'app', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    { path: 'login', component: LoginComponent },
];
