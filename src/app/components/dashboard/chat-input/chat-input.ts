import { Component, computed, input, output, signal, OnDestroy } from '@angular/core';
import { Button } from '../../ui/button/button';
import { InputField } from '../../ui/input-field/input-field';
import { IconComponent } from '../../ui/icon-component/icon-component';

type Attachment = {
  name: string;
  file?: File;
};

type SpeechRecognitionResultLike = {
  transcript: string;
  isFinal: boolean;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorEventLike = {
  error?: string;
  message?: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

@Component({
  selector: 'app-chat-input',
  imports: [Button, InputField, IconComponent],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.css',
})
export class ChatInput implements OnDestroy {
  isTramiteMode = input<boolean>(false);
  message = signal('');
  attachments = signal<Attachment[]>([]);
  onSendMessage = output<{ text: string; files: Attachment[] }>();
  isListening = signal(false);
  voicePreview = signal('');
  voiceError = signal<string | null>(null);

  isLongText = computed(() => {
    const text = this.message();
    return text.includes('\n') || text.length > 60;
  });

  private recognition: SpeechRecognitionLike | null = null;
  private lastResultIndex = 0;

  constructor() {
    this.initVoiceRecognition();
  }

  ngOnDestroy(): void {
    this.stopVoiceInput();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles: Attachment[] = Array.from(input.files).map((file) => ({
        name: file.name,
        file: file,
      }));
      this.attachments.update((current) => [...current, ...newFiles]);
      input.value = '';
    }
  }

  send() {
    if (this.message().trim() || this.attachments().length > 0) {
      this.onSendMessage.emit({
        text: this.message(),
        files: this.attachments(),
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
      return;
    }

    this.startVoiceInput();
  }

  private initVoiceRecognition(): void {
    const SpeechRecognitionCtor = this.getSpeechRecognitionCtor();
    if (!SpeechRecognitionCtor) {
      this.voiceError.set('Tu navegador no admite reconocimiento de voz. Prueba en Chrome o Edge.');
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'es-ES';

    recognition.onresult = (event) => {
      const results = Array.from(event.results);
      const transcript = results
        .slice(event.resultIndex)
        .map((result) => result.transcript)
        .join(' ')
        .trim();

      if (!transcript) {
        return;
      }

      if (results[results.length - 1]?.isFinal) {
        const cleaned = transcript.replace(/\s+/g, ' ').trim();
        const currentValue = this.message().trim();
        this.message.set(currentValue ? `${currentValue} ${cleaned}` : cleaned);
        this.voicePreview.set('');
        this.lastResultIndex = 0;
      } else {
        this.voicePreview.set(transcript);
      }
    };

    recognition.onerror = (event) => {
      const message = this.formatSpeechError(event.error ?? event.message);
      this.voiceError.set(message);
      this.isListening.set(false);
      this.voicePreview.set('');
    };

    recognition.onend = () => {
      this.isListening.set(false);
      this.voicePreview.set('');
      this.lastResultIndex = 0;
    };

    this.recognition = recognition;
  }

  private startVoiceInput(): void {
    if (!this.recognition) {
      this.voiceError.set('Tu navegador no admite reconocimiento de voz.');
      return;
    }

    this.voiceError.set(null);
    this.isListening.set(true);
    this.voicePreview.set('');
    this.lastResultIndex = 0;

    try {
      this.recognition.start();
    } catch (error) {
      this.voiceError.set(this.formatSpeechError((error as Error)?.message));
      this.isListening.set(false);
      this.voicePreview.set('');
    }
  }

  private stopVoiceInput(): void {
    if (!this.isListening()) {
      return;
    }

    this.recognition?.stop();
    this.isListening.set(false);
    this.voicePreview.set('');
  }

  private getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
    const globalScope = globalThis as typeof globalThis & {
      webkitSpeechRecognition?: SpeechRecognitionCtor;
      SpeechRecognition?: SpeechRecognitionCtor;
    };

    return globalScope.SpeechRecognition ?? globalScope.webkitSpeechRecognition ?? null;
  }

  private formatSpeechError(error?: string): string {
    const normalizedError = error?.toLowerCase() ?? '';

    switch (normalizedError) {
      case 'not-allowed':
      case 'permission-denied':
        return 'Permite el acceso al micrófono para usar la transcripción por voz.';
      case 'no-speech':
        return 'No se detectó audio. Inténtalo de nuevo.';
      case 'audio-capture':
        return 'No se pudo acceder al micrófono. Comprueba que esté conectado y disponible.';
      case 'network':
        return 'El navegador no pudo iniciar la transcripción por voz. Inténtalo de nuevo y asegúrate de tener permiso para usar el micrófono.';
      case 'aborted':
        return 'La transcripción fue cancelada.';
      default:
        return 'No se pudo iniciar la transcripción por voz. Prueba de nuevo o revisa el permiso del micrófono.';
    }
  }
}
