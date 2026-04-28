import { Component, input } from '@angular/core';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { Link } from '../../ui/link/link';

@Component({
  selector: 'app-document-card',
  imports: [IconComponent, Link],
  templateUrl: './document-card.html',
  styleUrl: './document-card.css',
})
export class DocumentCard {
  variant = input<CardVariant>('default');
  title = input.required<string>();
  description = input.required<string>();
  icon = input<IconName>('AccountBalance');
  linkLabel = input<string>('Ir a sección');
  linkUrl = input<string>('/');
}
