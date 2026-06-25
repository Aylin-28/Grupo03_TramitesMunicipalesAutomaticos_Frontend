import { Observable } from 'rxjs';

export interface Auth {

  register(
    user: any
  ): Observable<any>;

  login(
    document: string,
    password: string
  ): Observable<any>;

  isLoggedIn(): boolean;

  logout(): void;
}