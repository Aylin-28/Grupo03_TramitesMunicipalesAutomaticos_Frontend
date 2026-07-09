import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from '../../components/dashboard/sidebar/sidebar';
import { Topbar } from '../../components/dashboard/topbar/topbar';

@Component({
  selector: 'app-layout-dashboard',
  imports: [RouterOutlet, Sidebar, Topbar],
  templateUrl: './layout-dashboard.html',
  styleUrl: './layout-dashboard.css',
})
export class LayoutDashboard {
  constructor(private router: Router) {
    this.validarSesionSimulada();
  }

  private validarSesionSimulada(): void {
    const token = sessionStorage.getItem('access_token');

    if (!token) {
      this.router.navigate(['/auth']);
    }
  }
}
