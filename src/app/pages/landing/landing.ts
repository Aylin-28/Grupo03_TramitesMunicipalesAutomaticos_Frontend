import { Component } from '@angular/core';
import { SectionBranding } from '../../components/section-branding/section-branding';

@Component({
  selector: 'app-landing',
  imports: [SectionBranding],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
