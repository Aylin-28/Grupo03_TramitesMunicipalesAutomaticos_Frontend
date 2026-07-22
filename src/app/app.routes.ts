import { Routes } from '@angular/router';
import { LayoutAuth } from './layout/layout-auth/layout-auth';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { LayoutDashboard } from './layout/layout-dashboard/layout-dashboard';
import { Assistant } from './pages/dashboard/assistant/assistant';
import { History } from './pages/dashboard/history/history';
import { Documents } from './pages/dashboard/feedback/feedback';
import { Settings } from './pages/dashboard/settings/settings';
import { ObservedDocuments } from './pages/dashboard/observed-documents/observed-documents';
import { AuthComponent } from './pages/auth/auth';
import { TermsConditions } from './pages/terms-conditions/terms-conditions';
import { CentroAyuda } from './pages/centro-ayuda/centro-ayuda';

export const routes: Routes = [
  { path: '', component: Landing },
  {
    path: 'auth',
    component: LayoutAuth,
    children: [
      { path: '', component: AuthComponent },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'centro-ayuda', component: CentroAyuda },
      { path: 'terminos-y-condiciones', component: TermsConditions },
    ],
  },
  {
    path: 'dashboard',
    component: LayoutDashboard,
    children: [
      { path: 'assistant', component: Assistant },
      { path: 'assistant/:chat_id', component: Assistant },
      { path: 'history', component: History },
      { path: 'documents', component: Documents },
      { path: 'settings', component: Settings },
      { path: 'observed-documents', component: ObservedDocuments, data: { title: 'Bandeja de Documentos Observados' } },
    ],
  },
];
