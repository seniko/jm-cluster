import { Injectable } from '@angular/core';
import { AuthService} from './auth.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PartnersService {

  constructor(private authService: AuthService, private http: Http) { }

  getPartners() {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/cluster/partners')
    .map(res => res.json());
  }

  postPartner(partner) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.post('http://localhost:3000/cluster/partners', partner, {headers: headers})
    .map(res => res.json());
  }
  
  updatePartner(_id, updatedPartner) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.patch(`http://localhost:3000/cluster/partners/${_id}`, updatedPartner, {headers: headers})
    .map(res => res.json());
  }

  deletePartner(_id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.delete(`http://localhost:3000/cluster/partners/${_id}`, {headers: headers})
    .map(res => res.json());
  }

}
