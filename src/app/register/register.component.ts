import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  public captchaResponse?: string;
  public captchaSuccess = false;

  nameVal: String;
  emailVal: String;
  passwordVal: String;
  
  constructor(private authService: AuthService, 
    private router: Router, 
    private _flashMessagesService: FlashMessagesService) { }
    
  ngOnInit() { }

  onSubmit() {
    if (!this.captchaSuccess) {
      return alert('There is no selected captcha. Please, submit captcha first.');
    }
    const user = {
      name: this.nameVal,
      email: this.emailVal,
      password: this.passwordVal,
      recaptcha: this.captchaResponse
    }
    
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show('Registered! Log in.', {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
        this.router.navigate(['/login']);
        return;
      }
      this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
      this.router.navigate(['/register']);
    // }, err => {
    //   this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
    //   this.router.navigate(['/register']);
    });
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
  }

  reloadCaptcha(): void {
    this.captchaElem.reloadCaptcha();
  }

}
