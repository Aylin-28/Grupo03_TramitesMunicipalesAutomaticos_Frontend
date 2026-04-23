import { Component, input } from '@angular/core';

type IconName =
  | 'Fingerprint'
  | 'Visibility'
  | 'VisibilityOff'
  | 'Badge'
  | 'ShieldLock'
  | 'Add'
  | 'AccountBalance'
  | 'Settings'
  | 'AttachFile'
  | 'Description'
  | 'ContactSupport'
  | 'History'
  | 'Send'
  | 'ArrowRightAlt'
  | 'Notifications'
  | 'Forum'
  | 'SmartToy'
  | 'Tag'
  | 'Lock';

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
