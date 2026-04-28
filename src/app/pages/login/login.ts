import { Component, signal } from '@angular/core';
import { IconComponent } from '../../components/ui/icon-component/icon-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IconComponent, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((value) => !value);
  }
}
