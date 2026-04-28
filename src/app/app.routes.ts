import { Routes } from '@angular/router';
import { LayoutAuth } from './layout/layout-auth/layout-auth';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { LayoutDashboard } from './layout/layout-dashboard/layout-dashboard';
import { Assistant } from './pages/dashboard/assistant/assistant';
import { History } from './pages/dashboard/history/history';

export const routes: Routes = [
  { path: '', component: Landing },
  {
    path: 'auth',
    component: LayoutAuth,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
  {
    path: 'dashboard',
    component: LayoutDashboard,
    children: [
      { path: 'assistant', component: Assistant },
      { path: 'history', component: History },
    ],
  },
];
