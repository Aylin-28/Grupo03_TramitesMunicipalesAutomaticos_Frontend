import { Component } from '@angular/core';
import { Link } from '../../ui/link/link';
import { LayoutLanding } from '../../../layout/layout-landing/layout-landing';

@Component({
  selector: 'app-header-landing',
  imports: [Link, LayoutLanding],
  templateUrl: './header-landing.html',
  styleUrl: './header-landing.css',
})
export class HeaderLanding { }
