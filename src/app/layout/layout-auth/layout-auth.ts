import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLanding } from '../../components/landing/header-landing/header-landing';
import { FooterLanding } from '../../components/landing/footer-landing/footer-landing';

@Component({
  selector: 'app-layout-auth',
  imports: [RouterOutlet, HeaderLanding, FooterLanding],
  templateUrl: './layout-auth.html',
  styleUrl: './layout-auth.css',
})
export class LayoutAuth { }
