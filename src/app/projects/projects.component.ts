import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { AuthService} from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[];
  project: any;
  modeName: string;
  editMode: boolean = false;
  addMode: boolean = false;

  urlVal: string;
  imgUrlVal: string;
  titleVal: string;
  textVal: string;

  state: boolean;

  constructor(public projectService: ProjectsService, 
    public authService: AuthService, 
    public _flashMessagesService: FlashMessagesService,
    private dataService: DataService) { 
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
      // this.modal.nativeElement.style = 'display: none';
    }
  }
  

  onEdit(project) {
    this.editMode = true;
    this.modeName = "Update project";
    this.project = project;

    this.urlVal = project.url;
    this.imgUrlVal = project.imgUrl;
    this.titleVal = project.title;
    this.textVal = project.text;
  }

  onAdd() {
    this.addMode = true;
    this.modeName = "Add project";    
    this.form.reset();
  }

  onPost() {
    this.projectService.postProject(this.parseForm()).subscribe(project => {
      if (project) {
        this.projects.push(project);

        this.addMode = false;
        this._flashMessagesService.show("Project added.", {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
      }
    }, err => {
        this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
    });

  }

  onUpdate() {
    const index = this.projects.indexOf(this.project);
    this.projectService.updateProject(this.project._id, this.parseForm()).subscribe(project => {
      if (project) {
        this.projects.splice(index, 1, project);

        this.editMode = false;
        this._flashMessagesService.show("Project updated.", {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});

      }
    }, err => {
      this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
    });
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

}
