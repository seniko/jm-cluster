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
  project: any;

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
        this.project = data.project;

        this.urlVal = data.project.url;
        this.imgUrlVal = data.project.imgUrl;
        this.titleVal = data.project.title;
        this.textVal = data.project.text;
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
    this.modalService.onUpdate.emit(this.parseForm());
    this.editMode = false;
  }

}
