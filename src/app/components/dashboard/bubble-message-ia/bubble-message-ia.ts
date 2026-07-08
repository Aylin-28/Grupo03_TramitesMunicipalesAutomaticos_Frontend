import { Component, input } from '@angular/core';
import { Button } from '../../ui/button/button';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { CardDownloadIA } from '../card-download-ia/card-download-ia';
import { CardInputFieldIA } from '../card-input-field-ia/card-input-field-ia';
import confetti from 'canvas-confetti';

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
  steps = input<string[]>([]);
  checkedSteps = new Set<number>();

  celebrate() {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.7 }
    });
  }

  toggleStep(index: number, event: Event) {

    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.checkedSteps.add(index);
    } else {
      this.checkedSteps.delete(index);
    }

    this.checkCompletion();
  }


  private celebrated = false;

  checkCompletion() {

    const totalSteps = this.steps().length;

    if (
      this.checkedSteps.size === totalSteps &&
      !this.celebrated
    ) {

      this.celebrated = true;

      this.celebrate();

    }

  }
}
