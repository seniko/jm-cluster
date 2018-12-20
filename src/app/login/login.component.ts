import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  public captchaResponse?: string;
  public captchaSuccess = false;
  
  emailVal: String;
  passwordVal: String;

  constructor(private authService: AuthService,
    private _flashMessagesService: FlashMessagesService, 
    private router: Router) { }

  ngOnInit() { }

  onLoginSubmit() {
    if (!this.captchaSuccess) {
      return alert('There is no selected captcha. Please, submit captcha first.');
    }
    const user = {
      email: this.emailVal,
      password: this.passwordVal,
      recaptcha: this.captchaResponse
    }

    this.authService.authenticateUser(user).subscribe( data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this._flashMessagesService.show('Logged in.', {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
        this.router.navigate(['/']);
        return;
      }
      this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
      this.router.navigate(['/login']); 
    // }, err => {
    //   this._flashMessagesService.show('Invalid email or password.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
    //   this.router.navigate(['/login']); 
    });
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
  }

}
