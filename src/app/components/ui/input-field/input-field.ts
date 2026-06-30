import { Component, input, model, output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon-component/icon-component';

@Component({
  selector: 'app-input-field',
  imports: [IconComponent],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputField),
      multi: true
    }
  ]

})
export class InputField implements ControlValueAccessor {
  value = model<string>('');
  type = input<'text' | 'textarea'>('text');
  inputClass = input<string>('');
  label = input<string>('Label');
  placeholder = input<string>('');
  showLabel = input<boolean>(true);
  showPreIcon = input<boolean>(false);
  showSubIcon = input<boolean>(false);
  PreIcon = input<IconName>('Fingerprint');
  SubIcon = input<IconName>('Fingerprint');
  isPreIconClickable = input<boolean>(false);
  isSubIconClickable = input<boolean>(false);

  clickPreIcon = output<void>();
  clickSubIcon = output<void>();

  isDisabled = false;

  // ControlValueAccessor methods
  onChange = (value: any) => {};
  onTouched = () => {};

  // Se recibe el valor del formulario y se actualiza la señal interna
  writeValue(value: any): void {
    this.value.set(value || '');
  }

  // Registra la función a llamar cuando el valor del input cambia
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registra la función a llamar cuando el input pierde el foco
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Cambia el estado de deshabilitado del input, lo que afecta tanto a la señal interna como al formulario
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

handleInput(event: Event) {
    const el = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value.set(el.value);
    this.onChange(el.value);
  }

  handleBlur() {
    this.onTouched();
  }
  
}
