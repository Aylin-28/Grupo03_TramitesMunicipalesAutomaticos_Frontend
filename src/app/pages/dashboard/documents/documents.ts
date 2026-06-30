import { Component, computed, inject, Inject, signal } from '@angular/core';
import { Button } from '../../../components/ui/button/button';
import { Link } from '../../../components/ui/link/link';
import { DocumentCard } from '../../../components/dashboard/document-card/document-card';
import { FileCard } from '../../../components/dashboard/file-card/file-card';
import { Auth } from '../../../interfaces/auth';
import { AUTH_TOKEN } from '../../register/register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_DOCUMENTS_URL } from '../../../core/api';

interface FileRecord {
  id: number;
  title: string;
  date: string;
  tipo: string;
}

type DocumentCardType = {
  title: string;
  description: string;
  icon: IconName;
  linkLabel: string;
  linkUrl: string;
};

@Component({
  selector: 'app-documents',
  imports: [Button, Link, DocumentCard, FileCard],
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class Documents {
  private http = inject(HttpClient);

  constructor(@Inject(AUTH_TOKEN) private authService: Auth) {
    this.loadFiles();
  }

  fileRecords = signal<FileRecord[]>([]);
  tabs = signal(['Fecha', 'Tipo']);
  currentTab = signal(0);

  marriageCount = computed(() => {
    return this.fileRecords().filter((file) => file.tipo.toLowerCase() === 'matrimonio').length;
  });

  documentCategories = computed<DocumentCardType[]>(() => [
    {
      title: 'Matrimonio Civil',
      description:
        'Consulta tus actas de matrimonio, descarga copias certificadas y gestiona tus trámites.',
      icon: 'History',
      linkLabel: `${this.marriageCount()} Registros`,
      linkUrl: '/dashboard/documents',
    },
    {
      title: 'Actas de Nacimiento',
      description:
        'Accede a copias certificadas de nacimiento registradas, descarga extractos oficiales y realiza seguimientos.',
      icon: 'Badge',
      linkLabel: `0 Registros`,
      linkUrl: '/dashboard/documents',
    },
    {
      title: 'Bienes y Propiedades',
      description:
        'Consulta constancias de dominio, certificados registrales inmobiliarios y estado de gravámenes vigentes.',
      icon: 'AccountBalance',
      linkLabel: `0 Registros`,
      linkUrl: '/dashboard/documents',
    },
  ]);

  loadFiles() {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<FileRecord[]>(BASE_DOCUMENTS_URL, { headers }).subscribe({
      next: (data) => {
        console.log(data);
        this.fileRecords.set(data);
      },
      error: (err) => {
        console.error('Error al cargar archivos con token:', err);
        if (err.status === 401) {
          alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        } else {
          alert('No se pudieron obtener los registros.');
        }
      },
    });
  }

  setCurrentTab(index: number) {
    this.currentTab.set(index);
  }

  filteredCards = computed(() => {
    const list = [...this.fileRecords()];
    if (this.currentTab() === 0) {
      return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      return list.sort((a, b) => a.tipo.localeCompare(b.tipo));
    }
  });
}
