import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.css']
})
export class ScienceComponent implements OnInit, OnDestroy {
  articles: any[];
  article: any;

  state: boolean;
  parsedFormSubs: Subscription;

  constructor(public articleService: ArticlesService,
    public _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private dataService: DataService,
    private modalService: ModalService  ) { 

      this.parsedFormSubs = this.modalService.onPost.subscribe(parsedForm => {
        this.articleService.postArticle(parsedForm).subscribe(project => {
          if (project) {
            //this.articles.push(article);
            this.articles.unshift(project);
            this._flashMessagesService.show("Added.", {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
          }
        }, err => {
            this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
        });
      });

      this.modalService.onUpdate.subscribe(data => {
        if (data.modeName !== "Update article") return;
        this.articleService.updateArticle(data._id, data.parsedForm).subscribe(project => {
          if (project) {
            const index = this.articles.indexOf(this.article);
            this.articles.splice(index, 1, project);
            this._flashMessagesService.show("Updated.", {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
          }
        }, err => {
          this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
        });
      });
    }

  ngOnInit() {
    this.articleService.getArticles().subscribe(list => {
      this.articles = list;
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

  onDelete(article) {
    const confirmMessage = confirm("Do you want to delete this project?");

    if (confirmMessage) {
      this.articleService.deleteArticle(article._id).subscribe(data => {
        if (data.success) {
          const index = this.articles.indexOf(article);
          this.articles.splice(index, 1);
          this._flashMessagesService.show(data.msg, {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
        }
      }, err => {
        console.log(err);
        return false;
      });
    }
  }

  onEdit(article) {
    this.article = article;
    this.modalService.onEdit.emit({editMode: true, modeName: "Update article", item: article});
  }

  onAdd() {
    this.modalService.onAdd.emit({addMode: true, modeName: "Add Article"});
  }

  newState() {
    this.dataService.changeState(false);
  }  

}
