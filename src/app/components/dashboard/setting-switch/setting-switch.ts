import { Component, computed, input, model, output } from '@angular/core';
import { IconComponent } from '../../ui/icon-component/icon-component';

@Component({
  selector: 'app-setting-switch',
  imports: [IconComponent],
  templateUrl: './setting-switch.html',
  styleUrl: './setting-switch.css',
})
export class SettingSwitch {
  icon = input.required<IconName>();
  title = input.required<string>();
  description = input<string>('');

  checked = model<boolean>(false);
  disabled = input<boolean>(false);
  onChange = output<boolean>();

  toggleValue(): void {
    if (!this.disabled()) {
      const newValue = !this.checked();
      this.checked.set(newValue);
      this.onChange.emit(newValue);
    }
  }
}
