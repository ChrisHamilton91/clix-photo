import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  readonly transparent$ = new Subject<boolean>();
  readonly hidden$ = new Subject<boolean>();

  constructor() {}
}
