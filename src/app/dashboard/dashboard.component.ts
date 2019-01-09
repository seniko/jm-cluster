import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';
import { ProjectsService } from '../services/projects.service';
import { DataService } from '../services/data.service';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  numberOfUsers: number;
  numberOfMessages: number;
  numberOfProjects: number;
  numberOfArticles: number;

  state: boolean;

  constructor(private usersService: UsersService, 
  private messagesService: MessagesService, 
  private projectsService: ProjectsService,
  private articlesService: ArticlesService,
  private dataService: DataService) { }

  ngOnInit() {
    this.messagesService.getMessages().subscribe(list => {
      this.numberOfMessages = list.length;
    }, err => {
      console.log(err);
      return false;
    });
    this.usersService.getUsers().subscribe(list => {
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
    this.articlesService.getArticles().subscribe(list => {
      this.numberOfArticles = list.length;
    }, err => {
      console.log(err);
      return false;
    });
  }

  newState() {
    this.dataService.changeState(true);
  }

}
