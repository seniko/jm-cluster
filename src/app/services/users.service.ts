import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService {

  constructor(private http: Http,
    private authService: AuthService) { }

  getUsers() {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.get('users', {headers: headers})
    .map(res => res.json());
  }

  deleteUser(_id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.delete(`users/${_id}`, {headers: headers})
    .map(res => res.json());
  }
}
