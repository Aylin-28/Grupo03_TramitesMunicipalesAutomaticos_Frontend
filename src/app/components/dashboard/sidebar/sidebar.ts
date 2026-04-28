import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon-component/icon-component';
import { Button } from '../../ui/button/button';
import { Link } from '../../ui/link/link';

@Component({
  selector: 'app-sidebar',
  imports: [IconComponent, Button, Link],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {}
