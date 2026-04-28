import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-component',
  imports: [],
  templateUrl: './icon-component.html',
  styleUrl: './icon-component.css',
})
export class IconComponent {
  name = input.required<IconName>();
  size = input<number>(24);
}
