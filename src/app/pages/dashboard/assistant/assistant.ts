import { Component, Inject, InjectionToken, signal } from '@angular/core';
import { ChatInput } from '../../../components/dashboard/chat-input/chat-input';
import { CommonModule } from '@angular/common';
import { ChatMessageUser } from '../../../components/dashboard/chat-message-user/chat-message-user';
import { IAProcessing } from '../../../components/dashboard/iaprocessing/iaprocessing';
import { AlertPrivacity } from '../../../components/dashboard/alert-privacity/alert-privacity';
import { BubbleMessageIA } from '../../../components/dashboard/bubble-message-ia/bubble-message-ia';
import { BASE_IA_URL, BASE_URL } from '../../../core/api'
import { Auth } from '../../../interfaces/auth';
import { AUTH_TOKEN } from '../../register/register';
import { ActivatedRoute } from '@angular/router';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  downloadCards?: any[];
  quickReplies?: any[];
  inputFields?: any[];
  steps?: string[];
};

@Component({
  selector: 'app-assistant',
  imports: [
    ChatInput,
    CommonModule,
    ChatMessageUser,
    IAProcessing,
    AlertPrivacity,
    BubbleMessageIA,
  ],
  templateUrl: './assistant.html',
  styleUrl: './assistant.css',
})
export class Assistant {
  messages = signal<Message[]>([]);

  ngOnInit() {

    const routeChatId = this.route.snapshot.paramMap.get('chat_id');

    if (routeChatId) {
      this.chatId = routeChatId;
      this.loadHistory(routeChatId);
    } else {
      this.chatId = this.generateChatId();
    }

  }

  showHeader = signal<boolean>(true);
  isProcessing = signal<boolean>(false);

  chatId!: string;

  constructor(
    @Inject(AUTH_TOKEN) private authService: Auth,
    private route: ActivatedRoute
  ) { }

  handleNewMessage(event: { text: string; files: any[] }): void {
    if (this.isProcessing() || !event.text.trim()) return;
    if (this.showHeader()) this.showHeader.set(false);

    const userText = event.text.trim();
    this.addMessage('user', userText);
    this.isProcessing.set(true);
    this.scrollToBottom();

    if (userText.startsWith('/simular')) this.handleCommands(userText);
    else this.callAssistantAPI(userText, event.files);
  }

  private handleCommands(command: string): void {
    const type = command.split(' ')[1];

    const scenarios: Record<string, { user: string; assistant: string; extra?: any }> = {
      'solo-texto': {
        user: '¿Qué servicios municipales ofrecen?',
        assistant:
          'Ofrecemos asistencia para trámites de impuestos, reportes de infraestructura y consultas legales básicas.',
      },
      'quick-replies': {
        user: 'Quiero ver las opciones de contacto',
        assistant: 'Claro, ¿por qué medio prefieres comunicarte con un asesor?',
        extra: {
          quickReplies: [{ label: 'WhatsApp' }, { label: 'Llamada' }, { label: 'Correo' }],
        },
      },
      documentos: {
        user: 'Necesito mi guía de arbitrios',
        assistant: 'He generado el documento solicitado. Puedes descargarlo aquí:',
        extra: {
          downloadCards: [
            {
              tag: 'PDF',
              icon: 'Description',
              title: 'Guía Arbitrios 2024',
              description: 'Documento oficial de pagos',
              buttonLabel: 'Descargar',
            },
          ],
        },
      },
      formulario: {
        user: 'Quiero reportar un bache en mi calle',
        assistant:
          'Entiendo. Para iniciar el reporte, por favor ingresa el número de tu ticket de servicios:',
        extra: {
          inputFields: [
            {
              label: 'Código de Reporte',
              description: 'Ingresa el código de 12 dígitos',
              placeholder: 'REP-000',
              icon: 'LocationOn',
              statusBadge: 'REQUERIDO',
            },
          ],
        },
      },
    };

    const scene = scenarios[type];

    if (!scene) {
      this.addMessage(
        'assistant',
        'Comando no reconocido. Prueba con: solo-texto, quick-replies, documentos o formulario.',
      );
      this.isProcessing.set(false);
      return;
    }

    this.messages.update((prev) => prev.slice(0, -1));

    setTimeout(() => {
      this.addMessage('user', scene.user);
      this.isProcessing.set(true);
      this.scrollToBottom();

      setTimeout(() => {
        this.isProcessing.set(false);
        this.addMessage('assistant', scene.assistant, scene.extra || {});
        this.scrollToBottom();
      }, 2000);
    }, 500);
  }

  private addMessage(
    role: 'user' | 'assistant',
    content: string,
    extra: Partial<Message> = {},
  ): void {
    const newMsg: Message = {
      role,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...extra,
    };
    this.messages.update((prev) => [...prev, newMsg]);
  }

  private simulateAssistantResponse(userText: string): void {
    setTimeout(() => {
      const botMsg: Message = {
        role: 'assistant',
        content: `He analizado tu solicitud sobre "${userText}". Aquí tienes la documentación necesaria.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        downloadCards: [
          {
            tag: 'Documento',
            icon: 'Description',
            title: 'Guía Fiscal 2024',
            description: 'Requisitos para la declaración',
            buttonLabel: 'Descargar PDF',
          },
        ],
        quickReplies: [{ label: 'Hablar con un agente' }, { label: 'Ver plazos' }],
        inputFields: [
          {
            label: 'ID de Parcela',
            description: 'Ingresa el código de 12 dígitos',
            placeholder: '00-000-000',
            icon: 'Badge',
            statusBadge: 'REQUERIDO',
          },
        ],
      };

      this.isProcessing.set(false);
      this.messages.update((prev) => [...prev, botMsg]);
      this.scrollToBottom();
    }, 2000);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = document.querySelector('.scroll-viewport');
      container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  private async callAssistantAPI(userText: string, files: any[] = []): Promise<void> {
    this.isProcessing.set(true);

    try {
      const formData = new FormData();

      formData.append('question', userText);
      formData.append('chat_id', this.chatId);
      formData.append('provider', 'llama');

      const file = files?.[0]?.file;

      if (file instanceof File) {
        formData.append('file', file);
      }

      const token = this.authService.getToken();

      const response = await fetch(BASE_IA_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      this.messages.update(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        steps: data.steps ?? [],
      }]);

    } catch (err) {
      console.error(err);
    } finally {
      this.isProcessing.set(false);
      this.scrollToBottom();
    }
  }

  private async loadHistory(chatId: string) {

    try {

      const token = this.authService.getToken();

      const response = await fetch(
        `${BASE_URL}/ai/history/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log("HISTORY:", data);


      const loadedMessages: Message[] = data.history.map((msg: any) => ({
        role: msg.role,
        content: msg.message,
        timestamp: ''
      }));


      this.messages.set(loadedMessages);


      if (loadedMessages.length > 0) {
        this.showHeader.set(false);
      }


      setTimeout(() => {
        this.scrollToBottom();
      }, 100);


    } catch (error) {
      console.error("Error cargando historial:", error);
    }

  }

  private generateChatId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
