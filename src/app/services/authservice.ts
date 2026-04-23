import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class Authservice implements Auth {

  private readonly DB_KEY = 'temp_users_session';
  private readonly SESSION_KEY = 'current_session_user';

  private getAll(): any[] {
    return JSON.parse(sessionStorage.getItem(this.DB_KEY) || '[]');
  }

  register(user: any): void {
    const users = this.getAll();
    if (!users.find(u => u.email === user.email)) {
      users.push(user);
      sessionStorage.setItem(this.DB_KEY, JSON.stringify(users));
    }
  }

  login(email: string, pass: string): boolean {
    const user = this.getAll().find(u => u.email === email && u.pass === pass);
    if (user) {
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  isLoggedIn = () => !!sessionStorage.getItem(this.SESSION_KEY);

  logout = () => sessionStorage.removeItem(this.SESSION_KEY);

}
