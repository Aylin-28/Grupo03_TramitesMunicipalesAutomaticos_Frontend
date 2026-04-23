import { Routes } from '@angular/router';
import { LayoutAuth } from './layout/layout-auth/layout-auth';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: 'auth',
    component: LayoutAuth,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
];
