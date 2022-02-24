import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  condensed$ = this.breakpointObserver
    .observe('(max-width: 70rem)')
    .pipe(map((state) => state.matches));

  downscaled$ = this.breakpointObserver
    .observe('(max-width: 40rem)')
    .pipe(map((state) => state.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
