import { Component, input } from '@angular/core';
import { Button } from '../../ui/button/button';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { CardDownloadIA } from '../card-download-ia/card-download-ia';
import { CardInputFieldIA } from '../card-input-field-ia/card-input-field-ia';

@Component({
  selector: 'app-bubble-message-ia',
  imports: [Button, IconComponent, CardDownloadIA, CardInputFieldIA],
  templateUrl: './bubble-message-ia.html',
  styleUrl: './bubble-message-ia.css',
})
export class BubbleMessageIA {
  messageText = input<string>('');
  timestamp = input<string>('');
  downloadCards = input<DownloadCardItem[]>([]);
  quickReplies = input<QuickReplyItem[]>([]);
  inputFields = input<InputFieldCardItem[]>([]);
}
