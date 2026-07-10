import { Observable } from 'rxjs';

export interface Auth {
  register(user: any): Observable<any>;

  login(document: string, password: string): Observable<any>;

  updateStepState(stepId: number, state: boolean): Observable<any>;

  isLoggedIn(): boolean;

  logout(): void;

  getToken(): string | null;
}
