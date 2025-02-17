import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  //declaring and initializing the share data behaviour Subject
  data = new BehaviorSubject<string[]>([]);

  //exposing the subject as asObservable
  shareData$ = this.data.asObservable();

  //update the data and notify the subcribers
  updateData(newData: string[]) {
    this.data.next(newData);
  }

}
