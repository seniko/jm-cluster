import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: any[];
  project: any;

  state: boolean;
  parsedFormSubs: Subscription;

  constructor(public projectService: ProjectsService,
    public _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private dataService: DataService,
    private modalService: ModalService) { 

      this.parsedFormSubs = this.modalService.onPost.subscribe(parsedForm => {
        this.projectService.postProject(parsedForm).subscribe(project => {
          if (project) {
            //this.projects.push(project);
            this.projects.unshift(project);
            this._flashMessagesService.show("Added.", {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
          }
        }, err => {
            this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
        });
      });

      this.modalService.onUpdate.subscribe(data => {
        if (data.modeName !== "Update project") return;
        this.projectService.updateProject(data._id, data.parsedForm).subscribe(project => {
          if (project) {
            const index = this.projects.indexOf(this.project);
            this.projects.splice(index, 1, project);
            this._flashMessagesService.show("Updated.", {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
          }
        }, err => {
          this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
        });
      });
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(list => {
      this.projects = list;
    }, err => {
      console.log(err);
      return false;
    });

    this.dataService.currentState.subscribe(state => {
      this.state = state;
    });
  }

  ngOnDestroy() {
    if(this.parsedFormSubs) {
      this.parsedFormSubs.unsubscribe();
    }
  }

  onDelete(project) {
    const confirmMessage = confirm("Do you want to delete this project?");

    if (confirmMessage) {
      this.projectService.deleteProject(project._id).subscribe(data => {
        if (data.success) {
          const index = this.projects.indexOf(project);
          this.projects.splice(index, 1);
          this._flashMessagesService.show(data.msg, {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
        }
      }, err => {
        console.log(err);
        return false;
      });
    }
  }

  onEdit(project) {
    this.project = project;
    this.modalService.onEdit.emit({editMode: true, modeName: "Update project", item: project});
  }

  onAdd() {
    this.modalService.onAdd.emit({addMode: true, modeName: "Add Project"});
  }

    

}
