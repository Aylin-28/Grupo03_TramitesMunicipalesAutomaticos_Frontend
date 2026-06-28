import { Component, Inject, OnInit, signal } from '@angular/core';
import { Button } from '../../../components/ui/button/button';
import { HistoryCard } from '../../../components/dashboard/history-card/history-card';
import { BASE_URL } from '../../../core/api';
import { AUTH_TOKEN } from '../../register/register';
import { Auth } from '../../../interfaces/auth';

// type HistoryCardType = {
//   title: string;
//   label: string;
//   date: string;
//   department: string;
//   status: HistoryCardStatus;
//   icon: IconName;
//   linkUrl: string;
// };

type HistoryCardType = {
  chat_id: number;
  title: string;
  created_at: string;
  status: 'action' | 'progress' | 'completed';
  department: string;
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

  constructor(@Inject(AUTH_TOKEN) private authService: Auth) { }

  tabs = ['Todos', 'Acción Requerida', 'En Progreso', 'Completado'];
  currentTab = 0;

  // cards: HistoryCardType[] = [
  //   {
  //     title: 'Tramite 1',
  //     label: 'ID-00001',
  //     date: 'Octubre 12, 2023',
  //     department: 'Dep. de Impuestos',
  //     status: 'action',
  //     icon: 'CheckList',
  //     linkUrl: '/dashboard/assistant',
  //   },
  //   {
  //     title: 'Tramite 2',
  //     label: 'ID-00002',
  //     date: 'Octubre 12, 2023',
  //     department: 'Dep. de Impuestos',
  //     status: 'progress',
  //     icon: 'CheckList',
  //     linkUrl: '/dashboard/assistant',
  //   },
  //   {
  //     title: 'Tramite 3',
  //     label: 'ID-00003',
  //     date: 'Octubre 12, 2023',
  //     department: 'Dep. de Impuestos',
  //     status: 'completed',
  //     icon: 'AttachFile',
  //     linkUrl: '/dashboard/assistant',
  //   },
  // ];

  cards = signal<HistoryCardType[]>([]);

  ngOnInit() {
    this.fetchChats();
  }

  setCurrentTab(index: number) {
    this.currentTab = index;
  }

  async fetchChats() {
    try {
      const token = this.authService.getToken();

      const response = await fetch(`${BASE_URL}/ai/chats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      this.cards.set(data.map((item: any) => ({
        chat_id: item.chat_id,
        title: item.title,
        created_at: item.created_at,
        status: 'completed',
        department: 'General',
        icon: 'CheckList',
        linkUrl: `/dashboard/assistant/${item.chat_id}`
      })));

    } catch (error) {
      console.error("Error al cargar chats:", error);
    }
  }

  get filteredCards() {
    const cards = this.cards();

    if (this.currentTab === 0) return cards;

    const statusMap: { [key: number]: string } = {
      1: 'action',
      2: 'progress',
      3: 'completed'
    };

    return cards.filter(
      card => card.status === statusMap[this.currentTab]
    );
  }
}
