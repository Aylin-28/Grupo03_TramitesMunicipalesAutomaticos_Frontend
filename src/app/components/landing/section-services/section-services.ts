import { Component } from '@angular/core';
import { Link } from '../../ui/link/link';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { LayoutLanding } from '../../../layout/layout-landing/layout-landing';

@Component({
  selector: 'app-section-services',
  imports: [Link, IconComponent, LayoutLanding],
  templateUrl: './section-services.html',
  styleUrl: './section-services.css',
})
export class SectionServices { }
