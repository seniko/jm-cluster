import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {

  @Output() public onAdd: EventEmitter<any> = new EventEmitter();
  @Output() public onEdit: EventEmitter<any> = new EventEmitter();
  @Output() public onPost: EventEmitter<any> = new EventEmitter();
  @Output() public onUpdate: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
