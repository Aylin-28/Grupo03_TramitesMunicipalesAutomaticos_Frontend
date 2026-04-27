import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authservice } from '../../services/authservice';
import { FormsModule } from '@angular/forms';
import { InjectionToken } from '@angular/core';
import { Auth } from '../../interfaces/auth';
import { Inject } from '@angular/core';

export const AUTH_TOKEN = new InjectionToken<Auth>('Auth');

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  constructor(
    @Inject(AUTH_TOKEN) private authService: Auth,
    private http: HttpClient
  ) { }

  form = {
    nombre: '',
    dni: '',
    correo: '',
    password: '',
    acepta: false
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

  validarDni() {
    // eliminar todo lo que no sea número
    this.form.dni = this.form.dni.replace(/\D/g, '');

    // limitar a 8 dígitos
    if (this.form.dni.length > 8) {
      this.form.dni = this.form.dni.slice(0, 8);
    }
  }

  handleSubmit() {

    // Validar campos
    if (!this.form.nombre || !this.form.correo || !this.form.password) {
      alert('Completa todos los campos');
      return;
    }

    if (!this.form.dni) {
      alert('Ingresa un DNI válido (solo números)');
      return;
    }

    // Validar términos
    if (!this.form.acepta) {
      alert('Debes aceptar los términos');
      return;
    }

    if (this.form.dni.length !== 8) {
      alert('El DNI debe tener exactamente 8 dígitos');
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

    // Llamada a API DNI
    this.http.get<any>(`https://apiperu.dev/api/dni/${this.form.dni}`, {
      headers: {
        Authorization: 'Bearer 2e2d06338eddc98894bf69f9268b96554060d628ed34416ea0c64b9358a0ce8d'
      }
    }).subscribe({
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

        //  Validar coincidencia REAL
        const coincide =
          palabrasAPI.length === palabrasForm.length &&
          palabrasAPI.every(p => palabrasForm.includes(p));

        if (!coincide) {
          alert('El nombre no coincide con el DNI');
          return;
        }
        // Guardar usando service
        this.authService.register(this.form);

        alert('Registro exitoso');

      },
      error: () => {
        alert('Error al validar el DNI');
      }
    });
  }
}