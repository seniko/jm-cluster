import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(public usersService: UsersService,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(list => {
      this.users = list;
    }, err => {
      console.log(err);
      return false;
    });
  }

  onDelete(user) {
    const confirmMessage = confirm("Do you want to delete this user?");
    if (confirmMessage) {
      this.usersService.deleteUser(user._id).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show(data.msg, {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
      }
      }, err => {
      console.log(err);
      return false;
      });
    }
  }

}
