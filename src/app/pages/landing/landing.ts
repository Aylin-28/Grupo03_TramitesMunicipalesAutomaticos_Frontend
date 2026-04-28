import { Component } from '@angular/core';
import { SectionHero } from '../../components/section-hero/section-hero';
import { HeaderLanding } from '../../components/landing/header-landing/header-landing';
import { SectionFeatures } from '../../components/landing/section-features/section-features';
import { SectionServices } from '../../components/landing/section-services/section-services';
import { SectionBranding } from '../../components/landing/section-branding/section-branding';
import { FooterLanding } from '../../components/landing/footer-landing/footer-landing';

@Component({
  selector: 'app-landing',
  imports: [
    HeaderLanding,
    SectionHero,
    SectionFeatures,
    SectionServices,
    SectionBranding,
    FooterLanding,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing { }
