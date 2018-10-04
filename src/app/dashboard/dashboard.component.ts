import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { ProjectsService } from '../services/projects.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  numberOfUsers: number;
  numberOfMessages: number;
  numberOfProjects: number;

  state: boolean;

  constructor(private authService: AuthService, 
  private messagesService: MessagesService, 
  private projectsService: ProjectsService,
  private dataService: DataService) { }

  ngOnInit() {
    this.messagesService.getMessages().subscribe(list => {
      this.numberOfMessages = list.length;
    }, err => {
      console.log(err);
      return false;
    });
    this.authService.getUsers().subscribe(list => {
      this.numberOfUsers = list.length;
    }, err => {
      console.log(err);
      return false;
    });
    this.projectsService.getProjects().subscribe(list => {
      this.numberOfProjects = list.length;
    }, err => {
      console.log(err);
      return false;
    });
  }

  newState() {
    this.dataService.changeState(true);
  }

}
