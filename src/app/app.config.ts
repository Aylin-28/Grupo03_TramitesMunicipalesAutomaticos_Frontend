import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { Authservice } from './services/authservice';
import { routes } from './app.routes';
import { AUTH_TOKEN } from './pages/register/register';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })),
    { provide: AUTH_TOKEN, useClass: Authservice }
  ],
};
