import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authservice } from '../../services/authservice';
import { FormsModule } from '@angular/forms';
import { InjectionToken } from '@angular/core';
import { Auth } from '../../interfaces/auth';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

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
    private http: HttpClient,
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

  //Quita tildes, pasa a minusculas, elimina comas y elimina espacios al inicio y al final
  limpiar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(',', '')
      .trim();
  }

  validarDocumento() {
    // DNI
    if (this.form.tipoDocumento === 'dni') {
      // solo números
      this.form.numeroDocumento = this.form.numeroDocumento.replace(/\D/g, '');

      // máximo 8
      if (this.form.numeroDocumento.length > 8) {
        this.form.numeroDocumento = this.form.numeroDocumento.slice(0, 8);
      }
    }

    // Carné de extranjería
    else if (this.form.tipoDocumento === 'ce') {
      // letras y números
      this.form.numeroDocumento = this.form.numeroDocumento.replace(/[^a-zA-Z0-9]/g, '');

      // máximo 12
      if (this.form.numeroDocumento.length > 12) {
        this.form.numeroDocumento = this.form.numeroDocumento.slice(0, 12);
      }
    }
  }

  handleSubmit() {
    // Validar campos
    if (!this.form.nombre || !this.form.correo || !this.form.password) {
      alert('Completa todos los campos');
      return;
    }

    if (!this.form.numeroDocumento) {
      alert('Ingresa un documento válido');
      return;
    }

    // Validar términos
    if (!this.form.acepta) {
      alert('Debes aceptar los términos');
      return;
    }

    if (this.form.tipoDocumento === 'dni' && this.form.numeroDocumento.length !== 8) {
      alert('El DNI debe tener exactamente 8 dígitos');
      return;
    }

    if (this.form.tipoDocumento === 'ce' && this.form.numeroDocumento.length < 9) {
      alert('El Carné de Extranjería no es válido');
      return;
    }

    if (this.form.password.length < 8) {
      alert('La contraseña debe tener mínimo 8 caracteres');
      return;
    }

    //Valida que la contraseña tenga al menos una letra mayuscula
    if (!/[A-Z]/.test(this.form.password)) {
      alert('La contraseña debe tener al menos una mayúscula');
      return;
    }

    //Valida que la contraseña tenga al menos un numero
    if (!/[0-9]/.test(this.form.password)) {
      alert('La contraseña debe tener al menos un número');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(this.form.correo)) {
      alert('Correo inválido');
      return;
    }

    // VALIDACIÓN SOLO PARA DNI
    if (this.form.tipoDocumento === 'dni') {
      this.http
        .get<any>(`https://apiperu.dev/api/dni/${this.form.numeroDocumento}`, {
          headers: {
            Authorization:
              'Bearer 2e2d06338eddc98894bf69f9268b96554060d628ed34416ea0c64b9358a0ce8d',
          },
        })
        .subscribe({
          next: (data) => {
            if (!data || !data.data) {
              alert('DNI no válido');
              return;
            }

            const nombreAPI = this.limpiar(data.data.nombre_completo);
            const nombreForm = this.limpiar(this.form.nombre);

            const palabrasAPI = nombreAPI.split(' ');
            const palabrasForm = nombreForm.split(' ');

            // Validar nombre completo
            if (palabrasForm.length < palabrasAPI.length) {
              alert('Debe ingresar el nombre completo');
              return;
            }

            // Validar coincidencia REAL
            const coincide =
              palabrasAPI.length === palabrasForm.length &&
              palabrasAPI.every((p) => palabrasForm.includes(p));

            if (!coincide) {
              alert('El nombre no coincide con el DNI');
              return;
            }

            // Guardar usuario
            this.authService.register(this.form);

            this.router.navigate(['/dashboard/assistant']);
          },

          error: () => {
            alert('Error al validar el DNI');
          },
        });
    }

    // SI ES CARNÉ DE EXTRANJERÍA
    else {
      // Registrar directamente
      this.authService.register(this.form);

      this.router.navigate(['/dashboard/assistant']);
    }
  }
}
