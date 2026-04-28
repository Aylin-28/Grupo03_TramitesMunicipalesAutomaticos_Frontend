import { Component, input } from '@angular/core';
import { InputField } from '../../ui/input-field/input-field';
import { IconComponent } from '../../ui/icon-component/icon-component';

@Component({
  selector: 'app-card-input-field-ia',
  imports: [InputField, IconComponent],
  templateUrl: './card-input-field-ia.html',
  styleUrl: './card-input-field-ia.css',
})
export class CardInputFieldIA {
  label = input<string>('Input label');
  description = input<string>('Input descripción');
  placeholder = input<string>('e.g. 12-3456-789-0');
  icon = input<IconName>('Badge');
  statusBadge = input<string>('REQUIRED');
}
