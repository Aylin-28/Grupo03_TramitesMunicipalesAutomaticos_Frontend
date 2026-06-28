import { Component, signal, inject } from '@angular/core';
import { IconComponent } from '../../components/ui/icon-component/icon-component';
import { CommonModule } from '@angular/common';
import { Link } from '../../components/ui/link/link';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IconComponent, CommonModule, Link, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = signal(false);
  errorMessage = signal<string | null>(null); 

  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private authService = inject(Authservice);
  private router = inject(Router);

  // Definición del formulario reactivo
  loginForm: FormGroup = this.fb.group({
    document: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  togglePassword() {
    this.showPassword.update((value) => !value);
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.loginForm.valid) {

      // Limpiar cualquier error previo al intentar de nuevo

      this.errorMessage.set(null); 
      
      const { document, password } = this.loginForm.value;
      
      this.authService.login(document, password).subscribe({
        next: (response: any) => { 
          console.log('Login exitoso');
          this.router.navigate(['/dashboard/assistant']);
        },
        error: (error: any) => { 
          console.error('Error al iniciar sesión', error);

          this.errorMessage.set('Credenciales incorrectas o error de conexión con el servidor.');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}