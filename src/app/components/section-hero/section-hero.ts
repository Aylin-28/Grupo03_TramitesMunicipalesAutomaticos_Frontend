import { Component } from '@angular/core';
import { IconComponent } from '../ui/icon-component/icon-component';
import { LayoutLanding } from '../../layout/layout-landing/layout-landing';
import { Link } from '../ui/link/link';

@Component({
  selector: 'app-section-hero',
  imports: [Link, IconComponent, LayoutLanding],
  templateUrl: './section-hero.html',
  styleUrl: './section-hero.css',
})
export class SectionHero {}
