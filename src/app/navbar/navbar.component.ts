import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { BreakpointService } from '../services/breakpoint.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  condensed$ = new Observable();
  downscaled$ = new Observable();
  transparent = false;
  navbarHidden = false;

  constructor(
    private bps: BreakpointService,
    private navbar: NavbarService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.condensed$ = this.bps.condensed$;
    this.downscaled$ = this.bps.downscaled$;

    this.subs.add(
      this.navbar.transparent$.subscribe((value) => {
        if (this.transparent === value) return;
        this.transparent = value;
        this.cd.detectChanges();
      })
    );

    this.subs.add(
      this.navbar.hidden$.subscribe((value) => {
        if (this.navbarHidden === value) return;
        this.navbarHidden = value;
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
