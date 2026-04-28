import { Component, input } from '@angular/core';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { Link } from '../../ui/link/link';

@Component({
  selector: 'app-history-card',
  imports: [IconComponent, Link],
  templateUrl: './history-card.html',
  styleUrl: './history-card.css',
})
export class HistoryCard {
  icon = input<IconName>('CheckList');
  title = input<string>('Declaración');
  label = input<string>('ID-00000');
  date = input<string>('Octubre 12, 2023');
  department = input<string>('Dep. de Impuestos');
  status = input<HistoryCardStatus>('progress');
  linkUrl = input<string>('/');
}
