import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { ModalService } from '../services/modal.service';


@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modeName: string;
  editMode: boolean = false;
  addMode: boolean = false;
  item: any;

  urlVal: string;
  imgUrlVal: string;
  titleVal: string;
  textVal: string;


  constructor(public _flashMessagesService: FlashMessagesService, 
    public modalService: ModalService) { 

      this.modalService.onAdd.subscribe(data => {
        this.addMode = data.addMode;
        this.modeName = data.modeName;
        this.form.reset();
      });

      this.modalService.onEdit.subscribe(data => {
        this.editMode = data.editMode;
        this.modeName = data.modeName;
        this.item = data.item;

        this.urlVal = data.item.url;
        this.imgUrlVal = data.item.imgUrl;
        this.titleVal = data.item.title;
        this.textVal = data.item.text;
      });

    }

  ngOnInit() {
  }

  @ViewChild('form') form: NgForm;
  parseForm() {
    let parsedFormValue = this.form.value;

    for(let prop in parsedFormValue) {
      if ((parsedFormValue[prop] === null) || (parsedFormValue[prop] === "")) {
        delete parsedFormValue[prop];
      }
    }
    return  parsedFormValue;
  }
  

  @ViewChild('modal') modal: ElementRef;
  overlayClicked(event) {
    if (event.path.indexOf(this.modal.nativeElement) === -1) {
      this.editMode = false;
      this.addMode = false;
    }
  }

  onPost() {
    this.modalService.onPost.emit(this.parseForm());
    this.addMode = false;
  }

  onUpdate() {
    this.modalService.onUpdate.emit({_id: this.item._id, parsedForm: this.parseForm(), modeName: this.modeName});
    this.editMode = false;
  }

}
