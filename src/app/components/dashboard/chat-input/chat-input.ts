import { Component, computed, input, output, signal, inject, DestroyRef } from '@angular/core';
import { Button } from '../../ui/button/button';
import { InputField } from '../../ui/input-field/input-field';
import { IconComponent } from '../../ui/icon-component/icon-component';

type Attachment = {
  name: string;
  file?: File;
};

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [Button, InputField, IconComponent],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.css',
})
export class ChatInput {
  private readonly destroyRef = inject(DestroyRef);

  isTramiteMode = input<boolean>(false);
  onSendMessage = output<{ text: string; files: Attachment[] }>();

  message = signal('');
  attachments = signal<Attachment[]>([]);
  isListening = signal(false);
  voicePreview = signal('');
  voiceError = signal<string | null>(null);

  isLongText = computed(() => {
    const text = this.message();
    return text.includes('\n') || text.length > 60;
  });

  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private socket: WebSocket | null = null;

  private readonly DEEPGRAM_API_KEY = '12985ee5438b59e926d9702be518dd4e3124c89f';

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.stopVoiceInput();
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const newFiles: Attachment[] = Array.from(inputElement.files).map((file) => ({
        name: file.name,
        file: file,
      }));
      this.attachments.update((current) => [...current, ...newFiles]);
      inputElement.value = '';
    }
  }

  send(): void {
    const textToSend = this.message().trim();
    const filesToSend = this.attachments();

    if (textToSend || filesToSend.length > 0) {
      this.onSendMessage.emit({
        text: textToSend,
        files: filesToSend,
      });
      this.message.set('');
      this.attachments.set([]);
      this.voicePreview.set('');
      this.voiceError.set(null);
    }
  }

  addFile(): void {
    const mockFile: Attachment = { name: `archivo_${this.attachments().length + 1}.jpg` };
    this.attachments.update((current) => [...current, mockFile]);
  }

  removeFile(index: number): void {
    this.attachments.update((current) => current.filter((_, i) => i !== index));
  }

  toggleVoiceInput(): void {
    if (this.isListening()) {
      this.stopVoiceInput();
    } else {
      this.startVoiceInput();
    }
  }

  private async startVoiceInput(): Promise<void> {
    if (this.isListening()) return;

    this.isListening.set(true);
    this.voiceError.set(null);
    this.voicePreview.set('Conectando micrófono...');

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const model = 'nova-3';
      const language = 'es';
      const queryParams = `model=${model}&language=${language}&smart_format=true&interim_results=true`;

      this.socket = new WebSocket(`wss://api.deepgram.com/v1/listen?${queryParams}`, [
        'token',
        this.DEEPGRAM_API_KEY,
      ]);

      this.socket.onopen = () => {
        this.voicePreview.set('Escuchando...');
        this.startRecording();
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const transcript = data.channel?.alternatives?.[0]?.transcript;

          if (transcript !== undefined && transcript.trim() !== '') {
            if (data.is_final) {
              const cleaned = transcript.trim();
              this.message.update((current) => (current ? `${current} ${cleaned}` : cleaned));
              this.voicePreview.set('');
            } else {
              this.voicePreview.set(transcript);
            }
          }
        } catch (err) {
          console.error('Error procesando respuesta de Deepgram:', err);
        }
      };

      this.socket.onerror = (event) => {
        console.error('Error en el WebSocket de Deepgram:', event);
        this.voiceError.set('Ocurrió un error en la conexión con el servidor de voz.');
        this.stopVoiceInput();
      };

      this.socket.onclose = () => {
        this.stopVoiceInput();
      };
    } catch (error: any) {
      console.error('No se pudo iniciar el dictado por voz:', error);
      let customError = 'No se pudo acceder al micrófono.';
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        customError = 'Permite el acceso al micrófono para usar la transcripción por voz.';
      }
      this.voiceError.set(customError);
      this.stopVoiceInput();
    }
  }

  private getSupportedMimeType(): string {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4',
      'audio/aac',
    ];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return '';
  }

  private startRecording(): void {
    if (!this.mediaStream) return;

    const mimeType = this.getSupportedMimeType();
    const options = mimeType ? { mimeType } : undefined;

    try {
      this.mediaRecorder = new MediaRecorder(this.mediaStream, options);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(event.data);
        }
      };

      this.mediaRecorder.start(250);
    } catch (error) {
      console.error('Error al inicializar MediaRecorder:', error);
      this.voiceError.set('No se pudo inicializar la grabación en este navegador.');
      this.stopVoiceInput();
    }
  }

  private stopVoiceInput(): void {
    if (!this.isListening() && !this.mediaStream && !this.socket) {
      return;
    }

    this.isListening.set(false);
    this.voicePreview.set('');

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        console.warn('Error al detener MediaRecorder:', e);
      }
    }
    this.mediaRecorder = null;

    if (this.mediaStream) {
      try {
        this.mediaStream.getTracks().forEach((track) => track.stop());
      } catch (e) {
        console.warn('Error al detener los tracks de audio:', e);
      }
    }
    this.mediaStream = null;

    if (this.socket) {
      this.socket.onopen = null;
      this.socket.onmessage = null;
      this.socket.onerror = null;
      this.socket.onclose = null;

      if (this.socket.readyState === WebSocket.OPEN) {
        try {
          this.socket.send(JSON.stringify({ type: 'CloseStream' }));
        } catch (e) {}
      }
      try {
        this.socket.close();
      } catch (e) {}
    }
    this.socket = null;
  }
}
