import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subs = new Subscription();

  constructor(
    private scroll: ScrollDispatcher,
    private navbar: NavbarService
  ) {}

  ngOnInit(): void {
    //Navbar transparent at first
    this.navbar.transparent$.next(true);
    //Make navbar appear when scrolled down far enough
    this.subs.add(this.scroll.scrolled().subscribe(() => this.updateNavbar()));
  }

  ngOnDestroy(): void {
    this.navbar.transparent$.next(false);
    this.subs.unsubscribe();
  }

  updateNavbar() {
    //Height that navbar appears matches aspect ratio of photo
    this.navbar.transparent$.next(window.scrollY < window.innerWidth / 3);
  }
}
