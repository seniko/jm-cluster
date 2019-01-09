import { Injectable } from '@angular/core';
import { AuthService} from './auth.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ArticlesService {

  constructor(private authService: AuthService, private http: Http) { }

  getArticles() {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/cluster/articles')
    .map(res => res.json());
  }

  postArticle(article) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.post('http://localhost:3000/cluster/articles', article, {headers: headers})
    .map(res => res.json());
  }
  
  updateArticle(_id, updatedArticle) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.patch(`http://localhost:3000/cluster/articles/${_id}`, updatedArticle, {headers: headers})
    .map(res => res.json());
  }

  deleteArticle(_id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.delete(`http://localhost:3000/cluster/articles/${_id}`, {headers: headers})
    .map(res => res.json());
  }
}
