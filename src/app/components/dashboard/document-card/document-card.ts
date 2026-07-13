import { Component, Inject, input, output, signal } from '@angular/core';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { Link } from '../../ui/link/link';
import { BASE_URL } from '../../../core/api';
import { Auth } from '../../../interfaces/auth';
import { AUTH_TOKEN } from '../../../pages/register/register';

@Component({
  selector: 'app-document-card',
  imports: [IconComponent, Link],
  templateUrl: './document-card.html',
  styleUrl: './document-card.css',
})
export class DocumentCard {
  variant = input<CardVariant>('default');
  title = input.required<string>();
  description = input.required<string>();
  icon = input<IconName>('AccountBalance');
  linkLabel = input<string>('Ir a sección');
  newFeedback = input<string>('Agregar sugerencia');
  linkUrl = input<string>('/');

  titleInput = signal('');
  descInput = signal('');
  category_id = input.required<number>();
  points = signal(0);

  onAddFeedback = output<void>();
  categorySelected = output<number>();
  isModalOpen = signal(false);

  constructor(@Inject(AUTH_TOKEN) private authService: Auth) {}

  toggleModal() {
    this.isModalOpen.update((v) => !v);
  }

  setPoints(val: number) {
    this.points.set(val);
  }

  onLinkClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.categorySelected.emit(this.category_id());
  }

  async enviarSugerencia() {
    console.log('Título actual en la señal:', this.titleInput());
    console.log('Descripción actual en la señal:', this.descInput());
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const payload = {
      title: this.titleInput(),
      description: this.descInput(),
      points: this.points(),
      category_id: this.category_id(),
    };

    try {
      const response = await fetch(`${BASE_URL}/feedback/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Feedback creado exitosamente:', data);

        this.titleInput.set('');
        this.descInput.set('');

        this.toggleModal();
      } else {
        console.error('Error en el servidor:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar la sugerencia:', error);
    }
  }
}
