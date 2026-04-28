import { Component, input } from '@angular/core';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { Button } from '../../ui/button/button';

@Component({
  selector: 'app-file-card',
  imports: [IconComponent, Button],
  templateUrl: './file-card.html',
  styleUrl: './file-card.css',
})
export class FileCard {
  title = input<string>('File Name');
  date = input<string>('14 Oct 2023');
}
