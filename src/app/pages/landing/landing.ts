import { Component } from '@angular/core';
import { SectionHero } from '../../components/section-hero/section-hero';
import { HeaderLanding } from '../../components/landing/header-landing/header-landing';
import { SectionFeatures } from '../../components/landing/section-features/section-features';

@Component({
  selector: 'app-landing',
  imports: [
    HeaderLanding,
    SectionHero,
    SectionFeatures
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing { }
