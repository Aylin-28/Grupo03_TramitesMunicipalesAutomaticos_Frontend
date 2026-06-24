import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class Authservice implements Auth {

  private readonly API_URL =
    'http://localhost:8000/api/v1/auth';

  private readonly TOKEN_KEY =
    'access_token';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {

    if (user.tipoDocumento === 'dni') {

      return this.http.post(
        `${this.API_URL}/register/dni`,
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
      `${this.API_URL}/register/inmigrationcard`,
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
      `${this.API_URL}/login`,
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
}