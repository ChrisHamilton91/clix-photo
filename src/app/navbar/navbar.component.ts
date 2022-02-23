import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  condensed$ = new Observable();
  transparent = false;

  constructor(
    private bp: BreakpointObserver,
    private navbar: NavbarService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.condensed$ = this.bp
      .observe('(max-width: 70rem)')
      .pipe(map((state) => state.matches));

    this.subs.add(
      this.navbar.transparent$.subscribe((value) => {
        this.transparent = value;
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
