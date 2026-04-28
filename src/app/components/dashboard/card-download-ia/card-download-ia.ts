import { Component, input } from '@angular/core';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { Button } from '../../ui/button/button';

@Component({
  selector: 'app-card-download-ia',
  imports: [IconComponent, Button],
  templateUrl: './card-download-ia.html',
  styleUrl: './card-download-ia.css',
})
export class CardDownloadIA {
  tag = input<string>('Input Descargas');
  icon = input<IconName>('Description');
  title = input<string>('Propósito de control (Input)');
  description = input<string>('Input descripción');
  buttonLabel = input<string>('Descargar');
}
