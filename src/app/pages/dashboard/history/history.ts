import { Component } from '@angular/core';
import { Button } from '../../../components/ui/button/button';
import { HistoryCard } from '../../../components/dashboard/history-card/history-card';

type HistoryCardType = {
  title: string;
  label: string;
  date: string;
  department: string;
  status: HistoryCardStatus;
  icon: IconName;
  linkUrl: string;
};

@Component({
  selector: 'app-history',
  imports: [Button, HistoryCard],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  tabs = ['Todos', 'Acción Requerida', 'En Progreso', 'Completado'];
  currentTab = 0;

  cards: HistoryCardType[] = [
    {
      title: 'Tramite 1',
      label: 'ID-00001',
      date: 'Octubre 12, 2023',
      department: 'Dep. de Impuestos',
      status: 'action',
      icon: 'CheckList',
      linkUrl: '/dashboard/assistant',
    },
    {
      title: 'Tramite 2',
      label: 'ID-00002',
      date: 'Octubre 12, 2023',
      department: 'Dep. de Impuestos',
      status: 'progress',
      icon: 'CheckList',
      linkUrl: '/dashboard/assistant',
    },
    {
      title: 'Tramite 3',
      label: 'ID-00003',
      date: 'Octubre 12, 2023',
      department: 'Dep. de Impuestos',
      status: 'completed',
      icon: 'AttachFile',
      linkUrl: '/dashboard/assistant',
    },
  ];

  setCurrentTab(index: number) {
    this.currentTab = index;
  }

  get filteredCards() {
    if (this.currentTab === 0) return this.cards;
    const statusMap: { [key: number]: string } = { 1: 'action', 2: 'progress', 3: 'completed' };
    return this.cards.filter((card) => card.status === statusMap[this.currentTab]);
  }
}
