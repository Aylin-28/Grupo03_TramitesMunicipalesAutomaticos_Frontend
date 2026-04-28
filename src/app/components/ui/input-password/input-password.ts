import { Component, computed, input, signal } from '@angular/core';
import { InputField } from '../input-field/input-field';

@Component({
  selector: 'app-input-password',
  imports: [InputField],
  templateUrl: './input-password.html',
  styleUrl: './input-password.css',
})
export class InputPassword {
  label = input<string>('Label');
  placeholder = input<string>('');
  showPreIcon = input<boolean>(false);
  isShowPassword = signal(false);

  passwordClass = computed(() => (this.isShowPassword() ? '' : 'hide-text'));
  passwordIcon = computed<IconName>(() => (this.isShowPassword() ? 'VisibilityOff' : 'Visibility'));

  toggleVisibility() {
    this.isShowPassword.update((v) => !v);
  }
}
