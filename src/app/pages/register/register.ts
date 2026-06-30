import { Component, Inject, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../interfaces/auth';

export const AUTH_TOKEN = new InjectionToken<Auth>('Auth');

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {

  constructor(
    @Inject(AUTH_TOKEN) private authService: Auth,
    private router: Router,
  ) {}

  form = {
    nombre: '',
    tipoDocumento: 'dni',
    numeroDocumento: '',
    correo: '',
    password: '',
    acepta: false,
  };

  limpiarTexto(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-ZñÑ\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  limpiarDNI(texto: string): string {
    return texto.replace(/\D/g, '');
  }

  limpiarAlfanumerico(texto: string): string {
    return texto.replace(/[^a-zA-Z0-9]/g, '');
  }

  validarDocumento() {
    if (this.form.tipoDocumento === 'dni') {
      this.form.numeroDocumento = this.limpiarDNI(this.form.numeroDocumento);
      this.form.numeroDocumento = this.form.numeroDocumento.slice(0, 8);
    } else {
      this.form.numeroDocumento = this.limpiarAlfanumerico(this.form.numeroDocumento);
      this.form.numeroDocumento = this.form.numeroDocumento.slice(0, 12);
    }
  }

  handleSubmit() {

    // Limpieza final antes de enviar
    this.form.nombre = this.limpiarTexto(this.form.nombre);
    this.form.numeroDocumento =
      this.form.tipoDocumento === 'dni'
        ? this.limpiarDNI(this.form.numeroDocumento)
        : this.limpiarAlfanumerico(this.form.numeroDocumento);

    // Validaciones básicas
    if (!this.form.nombre) return alert('Nombre inválido: solo letras y espacios');
    if (!this.form.correo) return alert('Correo requerido');
    if (!this.form.password) return alert('Contraseña requerida');
    if (!this.form.numeroDocumento) return alert('Documento inválido');
    if (!this.form.acepta) return alert('Debes aceptar términos');

    // DNI
    if (this.form.tipoDocumento === 'dni') {
      if (!/^\d{8}$/.test(this.form.numeroDocumento)) {
        return alert('DNI inválido: debe contener exactamente 8 números sin símbolos');
      }
    }

    // CE
    if (this.form.tipoDocumento === 'ce') {
      if (this.form.numeroDocumento.length < 9) {
        return alert('Carné inválido: mínimo 9 caracteres');
      }

      if (!/^[a-zA-Z0-9]+$/.test(this.form.numeroDocumento)) {
        return alert('El documento no puede contener símbolos o espacios');
      }
    }

    // Password
    if (this.form.password.length < 8) return alert('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(this.form.password)) return alert('La contraseña debe tener una mayúscula');
    if (!/[0-9]/.test(this.form.password)) return alert('La contraseña debe tener un número');

    // Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.form.correo)) {
      return alert('Correo inválido');
    }

    // Registro
    this.authService.register(this.form).subscribe({
      next: () => {
        alert('Cuenta creada correctamente');
        this.router.navigate(['/dashboard/assistant']);
      },
      error: (err) => {
        alert(err.error?.detail || 'Error al registrar usuario');
      }
    });
  }
}