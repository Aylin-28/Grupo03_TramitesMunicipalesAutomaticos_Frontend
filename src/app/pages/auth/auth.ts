import { Component } from '@angular/core';
import { Register } from '../register/register';
import { Login } from '../login/login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  standalone: true,
  imports: [Register, Login, CommonModule],
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  tab: 'register' | 'login' = 'register';

  cambiarTab(valor: 'register' | 'login') {
    this.tab = valor;
  }
}
