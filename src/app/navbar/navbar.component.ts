import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  condensed = new Observable();

  constructor(private bp: BreakpointObserver) {}

  ngOnInit(): void {
    this.condensed = this.bp
      .observe('(max-width: 70rem)')
      .pipe(map((state) => state.matches));
  }
}
