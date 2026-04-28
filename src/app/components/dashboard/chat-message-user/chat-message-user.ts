import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chat-message-user',
  imports: [],
  templateUrl: './chat-message-user.html',
  styleUrl: './chat-message-user.css',
})
export class ChatMessageUser {
  message = input<string>('Respondiendo de parte del usuario');
  timestamp = input<string>('Miércoles, 21 de Abril 2025 10:30 PM');
}
