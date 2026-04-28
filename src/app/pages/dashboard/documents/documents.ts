import { Component, computed, signal } from '@angular/core';
import { Button } from '../../../components/ui/button/button';
import { Link } from '../../../components/ui/link/link';
import { DocumentCard } from '../../../components/dashboard/document-card/document-card';
import { FileCard } from '../../../components/dashboard/file-card/file-card';

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
  documentCategories = signal<DocumentCardType[]>([
    {
      title: 'Impuestos y Tasas',
      description:
        'Consulta tus deudas, descarga boletas y paga online con cualquier medio de pago de forma segura.',
      icon: 'History',
      linkLabel: '0 Registros',
      linkUrl: '/dashboard/documents',
    },
    {
      title: 'Próximamente',
      description: 'Próximamente disponible',
      icon: 'AccountBalance',
      linkLabel: 'No disponible',
      linkUrl: '/dashboard/documents',
    },
  ]);

  fileRecords = signal([
    { id: 1, title: 'Factura de Servicios - Abril', date: '2026-04-10', tipo: 'Factura' },
    { id: 2, title: 'Certificado de Dominio', date: '2026-03-15', tipo: 'Certificado' },
    { id: 3, title: 'Comprobante de Pago Web', date: '2026-04-25', tipo: 'Comprobante' },
    { id: 4, title: 'Licencia de Conducir Digital', date: '2026-01-20', tipo: 'Documento' },
  ]);

  tabs = signal(['Fecha', 'Tipo']);
  currentTab = signal(0);

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
