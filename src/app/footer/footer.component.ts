import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService } from '../services/breakpoint.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  downscaled$ = new Observable();

  constructor(private bps: BreakpointService) {}

  ngOnInit(): void {
    this.downscaled$ = this.bps.downscaled$;
  }
}
