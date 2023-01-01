import { Injectable } from '@angular/core';
import { AuthService} from './auth.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ProjectsService {

  constructor(private authService: AuthService, private http: Http) { }

  getProjects() {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    return this.http.get('cluster/projects')
    .map(res => res.json());
  }

  postProject(project) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.post('cluster/projects', project, {headers: headers})
    .map(res => res.json());
  }
  
  updateProject(_id, updatedProject) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.patch(`cluster/projects/${_id}`, updatedProject, {headers: headers})
    .map(res => res.json());
  }

  deleteProject(_id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.delete(`cluster/projects/${_id}`, {headers: headers})
    .map(res => res.json());
  }
}
