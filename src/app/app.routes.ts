import { Routes } from '@angular/router';
import { LayoutAuth } from './layout/layout-auth/layout-auth';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { AuthComponent } from './pages/auth/auth';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'auth',
    component: LayoutAuth,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
];
