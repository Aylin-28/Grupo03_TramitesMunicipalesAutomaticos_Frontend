import { Component, Inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Link } from '../../../components/ui/link/link';
import { IconComponent } from '../../../components/ui/icon-component/icon-component';
import { BASE_URL } from '../../../core/api';
import { AUTH_TOKEN } from '../../register/register';
import { Auth } from '../../../interfaces/auth';
import confetti from 'canvas-confetti';

interface ObservedDocument {
  id: string;
  chat_id: string;
  filename: string;
  extracted_text: string;
  created_at: string;
  chat_title: string;
  chat_state: string;
  user_name: string;
  user_email: string;
}

interface NotificationState {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  visible: boolean;
}

@Component({
  selector: 'app-observed-documents',
  imports: [CommonModule, FormsModule, Link, IconComponent],
  templateUrl: './observed-documents.html',
  styleUrl: './observed-documents.css',
})
export class ObservedDocuments implements OnInit {
  documents = signal<ObservedDocument[]>([]);
  selectedDoc = signal<ObservedDocument | null>(null);
  editText = signal<string>('');
  currentTab = signal<number>(0);
  searchText = signal<string>('');
  isModalOpen = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  notification = signal<NotificationState>({
    type: 'info',
    message: '',
    visible: false,
  });

  tabs = ['Observados', 'Aprobados', 'Todos'];

  constructor(@Inject(AUTH_TOKEN) private authService: Auth) {}

  ngOnInit() {
    this.loadDocuments();
  }

  async loadDocuments() {
    this.isLoading.set(true);
    try {
      const token = this.authService.getToken();
      const response = await fetch(`${BASE_URL}/admin/documents`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.documents.set(data);
        this.showNotification('Documentos cargados exitosamente', 'success');
      } else if (response.status === 403) {
        this.showNotification('No tienes permisos para acceder a esta sección', 'error');
      } else if (response.status === 401) {
        this.showNotification('Sesión expirada. Por favor, inicia sesión nuevamente', 'error');
      } else {
        this.showNotification('Error al cargar documentos', 'error');
      }
    } catch (error) {
      console.error('Error de red al cargar documentos:', error);
      this.showNotification('Error de conexión con el servidor', 'error');
    } finally {
      this.isLoading.set(false);
    }
  }

  filteredDocuments = computed(() => {
    const list = this.documents();
    const search = this.searchText().toLowerCase().trim();

    let tabFiltered = list;
    if (this.currentTab() === 0) {
      tabFiltered = list.filter((doc) => doc.chat_state === 'action');
    } else if (this.currentTab() === 1) {
      tabFiltered = list.filter((doc) => doc.chat_state === 'completed');
    }

    if (search) {
      return tabFiltered.filter(
        (doc) =>
          doc.filename.toLowerCase().includes(search) ||
          doc.user_name.toLowerCase().includes(search) ||
          doc.chat_title.toLowerCase().includes(search) ||
          doc.extracted_text.toLowerCase().includes(search),
      );
    }

    return tabFiltered;
  });

  setCurrentTab(index: number) {
    this.currentTab.set(index);
  }

  openReviewModal(doc: ObservedDocument) {
    this.selectedDoc.set(doc);
    this.editText.set(doc.extracted_text);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedDoc.set(null);
    this.editText.set('');
  }

  private showNotification(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
  ) {
    this.notification.set({ type, message, visible: true });
    setTimeout(() => {
      this.notification.set({ ...this.notification(), visible: false });
    }, 4000);
  }

  async saveDocumentText() {
    const doc = this.selectedDoc();
    if (!doc) {
      this.showNotification('No hay documento seleccionado', 'error');
      return;
    }

    if (!this.editText() || this.editText().trim().length === 0) {
      this.showNotification('El texto del documento no puede estar vacío', 'warning');
      return;
    }

    this.isSaving.set(true);
    try {
      const token = this.authService.getToken();
      const response = await fetch(`${BASE_URL}/admin/documents/${doc.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          extracted_text: this.editText(),
        }),
      });

      if (response.ok) {
        this.documents.update((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, extracted_text: this.editText() } : d)),
        );
        this.showNotification('Documento guardado con éxito', 'success');
      } else if (response.status === 404) {
        this.showNotification('Documento no encontrado', 'error');
      } else {
        this.showNotification('Error al guardar los cambios', 'error');
      }
    } catch (error) {
      console.error('Error al guardar documento:', error);
      this.showNotification('Error de conexión al guardar', 'error');
    } finally {
      this.isSaving.set(false);
    }
  }

  async approveProcedure() {
    const doc = this.selectedDoc();
    if (!doc) {
      this.showNotification('No hay documento seleccionado', 'error');
      return;
    }

    await this.saveDocumentText();

    this.isSaving.set(true);
    try {
      const token = this.authService.getToken();
      const response = await fetch(`${BASE_URL}/admin/chats/${doc.chat_id}/approve`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0254a2', '#1289f8', '#45a1f7', '#ffffff'],
        });

        this.documents.update((prev) =>
          prev.map((d) => (d.chat_id === doc.chat_id ? { ...d, chat_state: 'completed' } : d)),
        );

        this.showNotification('¡Trámite aprobado exitosamente!', 'success');
        this.closeModal();
      } else if (response.status === 404) {
        this.showNotification('Trámite no encontrado', 'error');
      } else if (response.status === 403) {
        this.showNotification('No tienes permisos para aprobar trámites', 'error');
      } else {
        this.showNotification('Error al aprobar el trámite', 'error');
      }
    } catch (error) {
      console.error('Error al aprobar trámite:', error);
      this.showNotification('Error de conexión al aprobar', 'error');
    } finally {
      this.isSaving.set(false);
    }
  }

  async observeProcedure() {
    const doc = this.selectedDoc();
    if (!doc) {
      this.showNotification('No hay documento seleccionado', 'error');
      return;
    }

    this.isSaving.set(true);
    try {
      const token = this.authService.getToken();
      const response = await fetch(`${BASE_URL}/admin/chats/${doc.chat_id}/observe`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        this.documents.update((prev) =>
          prev.map((d) => (d.chat_id === doc.chat_id ? { ...d, chat_state: 'action' } : d)),
        );
        this.showNotification('Trámite devuelto a observado para corrección', 'success');
        this.closeModal();
      } else if (response.status === 404) {
        this.showNotification('Trámite no encontrado', 'error');
      } else if (response.status === 403) {
        this.showNotification('No tienes permisos para observar trámites', 'error');
      } else {
        this.showNotification('Error al observar el trámite', 'error');
      }
    } catch (error) {
      console.error('Error al observar trámite:', error);
      this.showNotification('Error de conexión', 'error');
    } finally {
      this.isSaving.set(false);
    }
  }

  getNotificationClasses(): string {
    const notif = this.notification();
    if (!notif.visible) return 'notification hidden';
    return `notification ${notif.type}`;
  }

  getNotificationIcon(): string {
    const notif = this.notification();
    switch (notif.type) {
      case 'success':
        return 'Check';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      default:
        return 'Info';
    }
  }
}
