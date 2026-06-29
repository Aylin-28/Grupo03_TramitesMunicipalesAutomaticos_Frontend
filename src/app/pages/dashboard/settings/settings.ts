import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../../../components/ui/icon-component/icon-component';
import { InputField } from '../../../components/ui/input-field/input-field';
import { Button } from '../../../components/ui/button/button';
import { SettingSwitch } from '../../../components/dashboard/setting-switch/setting-switch';
import { Authservice } from '../../../services/authservice';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, InputField, Button, SettingSwitch],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(Authservice);

  // Señales reactivas para la vista
  userName = signal<string>('CARGANDO...');
  isSaving = signal<boolean>(false);
  message = signal<{text: string, type: 'success'|'error'} | null>(null);

  // Formularios con campos bloqueados por defecto usando disabled: true
  profileForm: FormGroup = this.fb.group({
    nombres: [{ value: '', disabled: true }],
    apellidos: [{ value: '', disabled: true }],
    documento: [{ value: '', disabled: true }],
    correo: ['', [Validators.required, Validators.email]] // El único editable
  });

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getMe().subscribe({
      next: (user) => {
        // Actualizamos el nombre en la interfaz superior
        this.userName.set(user.full_name);

        // Como el backend solo manda "full_name", lo separamos visualmente
        const nameParts = user.full_name.split(' ');
        const half = Math.ceil(nameParts.length / 2);
        const nombres = nameParts.slice(0, half).join(' ');
        const apellidos = nameParts.slice(half).join(' ');

        // Rellenamos el formulario
        this.profileForm.patchValue({
          nombres: nombres,
          apellidos: apellidos,
          documento: user.document_number,
          correo: user.email
        });
      },
      error: (err) => {
        console.error('Error al cargar datos del usuario', err);
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isSaving.set(true);
      this.message.set(null);
      
      const newEmail = this.profileForm.get('correo')?.value;

      this.authService.updateEmail(newEmail).subscribe({
        next: (response) => {
          this.isSaving.set(false);
          this.message.set({ text: 'Correo actualizado exitosamente.', type: 'success' });
        },
        error: (err) => {
          this.isSaving.set(false);
          const detail = err.error?.detail || 'Error al actualizar el correo.';
          this.message.set({ text: detail, type: 'error' });
        }
      });
    }
  }
}