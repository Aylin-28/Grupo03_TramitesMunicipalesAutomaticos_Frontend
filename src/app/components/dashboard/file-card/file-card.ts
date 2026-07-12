import { Component, computed, input } from '@angular/core';
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
  description = input<string>('14 Oct 2023');
  points = input<number>(0);
  category_title = input<string>('Titulo');

  stars = computed(() => {
    const score = Math.round(this.points());

    return Array(5).fill(0).map((_, i) => (i < score ? '★' : '☆'));
  });
}
