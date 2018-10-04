import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataService } from '../services/data.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  public isScrolled: boolean;
  public isFixed = true;
  public innerWidth: any;

  private state: boolean;

  constructor(public authService: AuthService, 
    public translate: TranslateService, 
    public _flashMessagesService: FlashMessagesService, 
    public router: Router,
    private dataService: DataService) {}

  @HostListener('window:scroll', ['$event'])
    onScroll($event) {
      if (pageYOffset > 60 && innerWidth >= 768) {
        this.isScrolled = true;
      } else this.isScrolled = false;
    }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.innerWidth = event.target.innerWidth;
      if (innerWidth < 768) {
        this.isFixed = false;
      } else this.isFixed = true;
    }

  ngOnInit() {
    this.innerWidth = window.screen.width;
    if (innerWidth < 768) {
      this.isFixed = false;
    } else this.isFixed = true;
  }

  onLogout() {
    this.authService.logout();
    this._flashMessagesService.show('Logged out.', {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
    this.router.navigate(['/login']);
    return false;
  }

  newState() {
    this.dataService.changeState(false);
  }

}
