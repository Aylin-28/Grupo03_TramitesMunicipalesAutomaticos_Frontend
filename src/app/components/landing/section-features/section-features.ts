import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { LayoutLanding } from '../../../layout/layout-landing/layout-landing';

@Component({
  selector: 'app-section-features',
  imports: [IconComponent, LayoutLanding],
  templateUrl: './section-features.html',
  styleUrl: './section-features.css',
})
export class SectionFeatures { }
