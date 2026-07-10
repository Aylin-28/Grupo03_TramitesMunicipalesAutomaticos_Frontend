import { Component, effect, EventEmitter, Inject, input, Output } from '@angular/core';
import { Button } from '../../ui/button/button';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { CardDownloadIA } from '../card-download-ia/card-download-ia';
import { CardInputFieldIA } from '../card-input-field-ia/card-input-field-ia';
import confetti from 'canvas-confetti';
import { AUTH_TOKEN } from '../../../pages/register/register';
import { Auth } from '../../../interfaces/auth';
import { BASE_URL } from '../../../core/api';

@Component({
  selector: 'app-bubble-message-ia',
  imports: [Button, IconComponent, CardDownloadIA, CardInputFieldIA],
  templateUrl: './bubble-message-ia.html',
  styleUrl: './bubble-message-ia.css',
})
export class BubbleMessageIA {
  @Output() onCompletionReady = new EventEmitter<void>();

  chatId = input<string>('');
  messageText = input<string>('');
  timestamp = input<string>('');
  downloadCards = input<DownloadCardItem[]>([]);
  quickReplies = input<QuickReplyItem[]>([]);
  inputFields = input<InputFieldCardItem[]>([]);
  steps = input<StepItem[]>([]);
  checkedSteps = new Set<number>();
  
  constructor(@Inject(AUTH_TOKEN) private authService: Auth) {
    effect(() => {
       this.steps().forEach((step, index) => {
         if (step.state) {
           this.checkedSteps.add(index);
         }
       });
    });
  }
  
  celebrate() {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.7 }
    });
  }

  toggleStep(index: number, event: Event) {

    const checked = (event.target as HTMLInputElement).checked;
    const step = this.steps()[index];
    const stepId = step?.id ?? index + 1;

    if (checked) {
      this.checkedSteps.add(index);
    } else {
      this.checkedSteps.delete(index);
    }

    this.authService.updateStepState(stepId, checked).subscribe({
      error: (err) => {
        console.error('No se pudo actualizar el estado del paso', err);
      },
    });

    this.checkCompletion();
  }


  private celebrated = false;

  checkCompletion() {

    const totalSteps = this.steps().length;
    if (this.checkedSteps.size == 0) {
      this.changeToActionState("progress");
    }
    else if (this.checkedSteps.size === totalSteps && !this.celebrated) {
      this.celebrate();
      this.onCompletionReady.emit();
    } else {
      this.changeToActionState("action");
    }

  }

  async changeToActionState(state: string) {
    try {
      const token = this.authService.getToken();

      const response = await fetch(`${BASE_URL}/ai/chats/state/${this.chatId()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ state: state }),
      });

      if (!response.ok) throw new Error('Error al actualizar el estado');

      console.log("Estado guardado correctamente en el servidor");
    } catch (error) {
      console.error("No se pudo guardar el estado:", error);
    }
  }
}
