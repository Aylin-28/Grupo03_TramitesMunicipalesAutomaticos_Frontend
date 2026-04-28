import { Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../icon-component/icon-component';

@Component({
  selector: 'app-link',
  imports: [IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './link.html',
  styleUrl: './link.css',
})
export class Link {
  to = input.required<string>();
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
