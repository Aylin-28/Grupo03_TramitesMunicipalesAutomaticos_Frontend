import { Component, computed, input, model, output, signal } from '@angular/core';
import { Button } from '../../ui/button/button';
import { InputField } from '../../ui/input-field/input-field';
import { IconComponent } from '../../ui/icon-component/icon-component';

type Attachment = {
  name: string;
  file?: File;
};

@Component({
  selector: 'app-chat-input',
  imports: [Button, InputField, IconComponent],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.css',
})
export class ChatInput {
  isTramiteMode = input<boolean>(false);
  message = signal('');
  attachments = signal<Attachment[]>([]);
  onSendMessage = output<{ text: string; files: Attachment[] }>();

  isLongText = computed(() => {
    const text = this.message();
    return text.includes('\n') || text.length > 60;
  });

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
    }
  }

  addFile(): void {
    const mockFile: Attachment = { name: `archivo_${this.attachments().length + 1}.jpg` };
    this.attachments.update((current) => [...current, mockFile]);
  }

  removeFile(index: number): void {
    this.attachments.update((current) => current.filter((_, i) => i !== index));
  }
}
