import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { BASE_AUTH_URL } from '../core/api';

@Injectable({
  providedIn: 'root',
})
export class Authservice implements Auth {

  private readonly TOKEN_KEY =
    'access_token';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMe(): Observable<any> {
    return this.http.get(
      `${BASE_AUTH_URL}/me`, 
      { headers: this.getHeaders() }
    );
  }

  updateEmail(email: string): Observable<any> {
    return this.http.put(
      `${BASE_AUTH_URL}/me`, 
      { email }, 
      { headers: this.getHeaders() }
    );
  }
  register(user: any): Observable<any> {

    if (user.tipoDocumento === 'dni') {

      return this.http.post(
        `${BASE_AUTH_URL}/register/dni`,
        {
          fullname: user.nombre,
          email: user.correo,
          password: user.password,
          dni: user.numeroDocumento
        }
      ).pipe(
        tap((response: any) => {
          sessionStorage.setItem(
            this.TOKEN_KEY,
            response.access_token
          );
        })
      );
    }

    return this.http.post(
      `${BASE_AUTH_URL}/register/inmigrationcard`,
      {
        fullname: user.nombre,
        email: user.correo,
        password: user.password,
        immigration_card: user.numeroDocumento
      }
    ).pipe(
      tap((response: any) => {
        sessionStorage.setItem(
          this.TOKEN_KEY,
          response.access_token
        );
      })
    );
  }

  login(
    document: string,
    password: string
  ): Observable<any> {

    return this.http.post(
      `${BASE_AUTH_URL}/login`,
      {
        document,
        password
      }
    ).pipe(
      tap((response: any) => {
        sessionStorage.setItem(
          this.TOKEN_KEY,
          response.access_token
        );
      })
    );
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(
      this.TOKEN_KEY
    );
  }

  logout(): void {
    sessionStorage.removeItem(
      this.TOKEN_KEY
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem(
      this.TOKEN_KEY
    );
  }
}