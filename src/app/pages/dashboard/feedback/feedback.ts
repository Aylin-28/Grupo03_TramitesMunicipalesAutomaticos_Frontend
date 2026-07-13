import { Component, computed, inject, Inject, signal } from '@angular/core';
import { Button } from '../../../components/ui/button/button';
import { Link } from '../../../components/ui/link/link';
import { DocumentCard } from '../../../components/dashboard/document-card/document-card';
import { FileCard } from '../../../components/dashboard/file-card/file-card';
import { Auth } from '../../../interfaces/auth';
import { AUTH_TOKEN } from '../../register/register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_DOCUMENTS_URL, BASE_URL } from '../../../core/api';
import { FormsModule } from '@angular/forms';

interface FileRecord {
  id: number;
  title: string;
  description: string;
  points: number;
  category_title: string;
  category_id: number;
  date: string;
  tipo: string;
}

type DocumentCardType = {
  title: string;
  description: string;
  icon: IconName;
  linkLabel: string;
  linkUrl: string;
  category_id: number;
};

interface CategoryCount {
  category_id: number;
  total: number;
}

@Component({
  selector: 'app-documents',
  imports: [FormsModule, Link, DocumentCard, FileCard],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Documents {
  private http = inject(HttpClient);
  newCategoryName = signal('');
  descInput = signal('');

  constructor(@Inject(AUTH_TOKEN) private authService: Auth) {
    this.loadFiles();
  }

  fileRecords = signal<FileRecord[]>([]);
  tabs = signal(['Fecha', 'Tipo']);
  currentTab = signal(0);
  selectedCategoryId = signal<number | null>(null);

  marriageCount = computed(() => {
    return this.fileRecords().filter((file) => file.tipo.toLowerCase() === 'matrimonio').length;
  });

  isModalOpen = signal(false);

  toggleModal() {
    this.isModalOpen.set(!this.isModalOpen());
  }

  // documentCategories = computed<DocumentCardType[]>(() => [
  //   {
  //     title: 'Matrimonio Civil',
  //     description:
  //       'Consulta tus actas de matrimonio, descarga copias certificadas y gestiona tus trámites.',
  //     icon: 'History',
  //     linkLabel: `${this.marriageCount()} Registros`,
  //     linkUrl: '/dashboard/documents',
  //   },
  //   {
  //     title: 'Actas de Nacimiento',
  //     description:
  //       'Accede a copias certificadas de nacimiento registradas, descarga extractos oficiales y realiza seguimientos.',
  //     icon: 'Badge',
  //     linkLabel: `0 Registros`,
  //     linkUrl: '/dashboard/documents',
  //   },
  //   {
  //     title: 'Bienes y Propiedades',
  //     description:
  //       'Consulta constancias de dominio, certificados registrales inmobiliarios y estado de gravámenes vigentes.',
  //     icon: 'AccountBalance',
  //     linkLabel: `0 Registros`,
  //     linkUrl: '/dashboard/documents',
  //   },
  // ]);

  documentCategories = computed<DocumentCardType[]>(() => {
    const allCounts = this.counts();

    const getCount = (id: number) => {
      return allCounts.find((c) => c.category_id === id)?.total || 0;
    };

    return [
      {
        title: 'Matrimonio Civil',
        category_id: 1,
        description:
          'Consulta tus actas de matrimonio, descarga copias certificadas y gestiona tus trámites.',
        icon: 'History',
        linkLabel: `${getCount(1)} Registros`,
        linkUrl: 'javascript:void(0)',
      },
      {
        title: 'Actas de Nacimiento',
        category_id: 2,
        description:
          'Accede a copias certificadas de nacimiento registradas, descarga extractos oficiales y realiza seguimientos.',
        icon: 'Badge',
        linkLabel: `${getCount(2)} Registros`,
        linkUrl: 'javascript:void(0)',
      },
      {
        title: 'Bienes y Propiedades',
        category_id: 3,
        description:
          'Consulta constancias de dominio, certificados registrales inmobiliarios y estado de gravámenes vigentes.',
        icon: 'AccountBalance',
        linkLabel: `${getCount(3)} Registros`,
        linkUrl: 'javascript:void(0)',
      },
    ];
  });

  // loadFiles() {
  //   const token = this.authService.getToken();

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http.get<FileRecord[]>(BASE_DOCUMENTS_URL, { headers }).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.fileRecords.set(data);
  //     },
  //     error: (err) => {
  //       console.error('Error al cargar archivos con token:', err);
  //       if (err.status === 401) {
  //         alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
  //       } else {
  //         alert('No se pudieron obtener los registros.');
  //       }
  //     },
  //   });
  // }

  counts = signal<CategoryCount[]>([]);

  async loadFiles() {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const countsResponse = await fetch(`${BASE_URL}/feedback/counts`, {
        method: 'GET',
        headers: headers,
      });

      if (countsResponse.ok) {
        const countsData = await countsResponse.json();
        this.counts.set(countsData);
      }

      const recordsResponse = await fetch(`${BASE_URL}/feedback/`, {
        method: 'GET',
        headers: headers,
      });

      if (recordsResponse.ok) {
        const recordsData = await recordsResponse.json();
        this.fileRecords.set(recordsData);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  setCurrentTab(index: number) {
    this.currentTab.set(index);
  }

  setCategoryFilter(categoryId: number | null) {
    this.selectedCategoryId.update((current) => (current === categoryId ? null : categoryId));
  }

  filteredCards = computed(() => {
    const list = [...this.fileRecords()];
    const filteredByCategory =
      this.selectedCategoryId() === null
        ? list
        : list.filter((file) => file.category_id === this.selectedCategoryId());

    if (this.currentTab() === 0) {
      return filteredByCategory.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    return filteredByCategory.sort((a, b) => a.tipo.localeCompare(b.tipo));
  });

  async enviarNuevaCategoria() {
    const token = this.authService.getToken();
    const payload = {
      title: `Agregar categoría: ${this.newCategoryName()}`,
      description: this.descInput(),
      points: 0,
      category_id: 0,
    };

    try {
      const response = await fetch(`${BASE_URL}/feedback/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        this.toggleModal();
        this.newCategoryName.set('');
        this.descInput.set('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
