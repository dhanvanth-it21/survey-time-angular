import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClickEventService {

  constructor() { }

  data = new BehaviorSubject<string>('');

  shareData$ = this.data.asObservable();

  updateData(str: string) {
    this.data.next(str);
  }
}
