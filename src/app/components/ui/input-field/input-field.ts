import { Component, input, model, output } from '@angular/core';
import { IconComponent } from '../icon-component/icon-component';

@Component({
  selector: 'app-input-field',
  imports: [IconComponent],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField {
  value = model<string>('');
  type = input<'text' | 'textarea'>('text');
  inputClass = input<string>('');
  label = input<string>('Label');
  placeholder = input<string>('');
  showLabel = input<boolean>(true);
  showPreIcon = input<boolean>(false);
  showSubIcon = input<boolean>(false);
  PreIcon = input<IconName>('Fingerprint');
  SubIcon = input<IconName>('Fingerprint');
  isPreIconClickable = input<boolean>(false);
  isSubIconClickable = input<boolean>(false);

  clickPreIcon = output<void>();
  clickSubIcon = output<void>();

  handleInput(event: Event) {
    const el = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value.set(el.value);
  }
}
