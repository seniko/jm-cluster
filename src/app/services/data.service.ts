import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class DataService {

  private stateSource = new BehaviorSubject<boolean>(false);
  currentState = this.stateSource.asObservable();

  constructor() { }

  changeState(state: boolean) {
    this.stateSource.next(state);
  }

}
