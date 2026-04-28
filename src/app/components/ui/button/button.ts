import { Component, computed, input } from '@angular/core';
import { IconComponent } from '../icon-component/icon-component';

@Component({
  selector: 'app-button',
  imports: [IconComponent],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<Variant>('default');
  label = input<string>('Link');
  fontSize = input<FontSize>('m');
  fontWeight = input<FontWeight>('regular');
  showLabel = input<boolean>(true);
  showPreIcon = input<boolean>(false);
  showSubIcon = input<boolean>(false);
  PreIcon = input<IconName>('Fingerprint');
  SubIcon = input<IconName>('Fingerprint');

  fontSizeClass = computed(() => `var(--font-size-${this.fontSize()})`);
  fontWeightClass = computed(() => `var(--font-weight-${this.fontWeight()})`);
}