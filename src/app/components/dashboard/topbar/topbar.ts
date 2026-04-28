import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { Link } from '../../ui/link/link';

@Component({
  selector: 'app-topbar',
  imports: [Link],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly navTitle = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.data['title'] || 'CIVIC IA';
      }),
    ),
    { initialValue: 'Home' },
  );
}
