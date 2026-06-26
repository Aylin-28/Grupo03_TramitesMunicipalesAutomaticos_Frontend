import { Component, signal } from '@angular/core';
import { IconComponent } from '../../components/ui/icon-component/icon-component';
import { CommonModule } from '@angular/common';
import { Link } from '../../components/ui/link/link';
import { FormsModule } from '@angular/forms';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

import { AUTH_TOKEN } from '../register/register';
import { Auth } from '../../interfaces/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IconComponent, CommonModule, Link, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  document = '';
  password = '';

  constructor(
    @Inject(AUTH_TOKEN)
    private authService: Auth,
    private router: Router
  ) { }

  login() {

    if (!this.document) {

      alert('Ingrese documento');
      return;

    }

    if (!this.password) {

      alert('Ingrese contraseña');
      return;

    }

    this.authService
      .login(
        this.document,
        this.password
      )
      .subscribe({

        next: () => {

          this.router.navigate([
            '/dashboard/assistant'
          ]);

        },

        error: (err) => {

          alert(
            err.error?.detail ||
            'Credenciales inválidas'
          );

        }

      });

  }

  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((value) => !value);
  }

  @Output() registerClick = new EventEmitter<void>();

  irARegistro() {
    this.registerClick.emit();
  }

}
