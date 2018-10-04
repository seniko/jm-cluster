import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: any[];

  constructor(private messagesService: MessagesService, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.messagesService.getMessages().subscribe(list => {
      this.messages = list;
    }, err => {
      console.log(err);
      return false;
    });
  }

  onRemove(message) {
    let confirmDelete = confirm("Do you want to delete this message?");
    
    if (confirmDelete) {
      this.messagesService.removeMessage(message._id).subscribe(data => {
        this._flashMessagesService.show(data.msg, {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
      }, err => {
        console.log(err);
        return false;
      });
      const index = this.messages.indexOf(message);
      this.messages.splice(index, 1);
    }
    
  }

}
