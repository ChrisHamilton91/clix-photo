import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NavbarService } from '../navbar/navbar.service';
import { BreakpointService } from '../services/breakpoint.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  condensed$ = new Observable();
  downscaled$ = new Observable();

  constructor(
    private scroll: ScrollDispatcher,
    private navbar: NavbarService,
    private bps: BreakpointService
  ) {}

  ngOnInit(): void {
    this.condensed$ = this.bps.condensed$;
    this.downscaled$ = this.bps.downscaled$;
    //Navbar transparent at first
    this.navbar.transparent$.next(true);
    //Make navbar appear when scrolled down far enough
    this.subs.add(this.scroll.scrolled().subscribe(() => this.updateNavbar()));
    //Hide navbar on condensed layout
    this.subs.add(
      this.bps.condensed$.subscribe((value) => this.navbar.hidden$.next(value))
    );
  }

  ngOnDestroy(): void {
    this.navbar.transparent$.next(false);
    this.navbar.hidden$.next(false);
    this.subs.unsubscribe();
  }

  updateNavbar() {
    //Height that navbar appears matches aspect ratio of photo
    this.navbar.transparent$.next(window.scrollY < window.innerWidth / 3);
  }
}
