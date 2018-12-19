import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ReCaptcha2Component } from 'ngx-captcha';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  public captchaResponse?: string;
  public captchaSuccess = false;

  nameVal: String;
  emailVal: String;
  messageVal: String;

  constructor(private messagesService: MessagesService,
     private _flashMessagesService: FlashMessagesService, 
     private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.nameVal = user.name;
      this.emailVal = user.email;
    }
  }

  onSubmit(form) {
    if (!this.captchaSuccess) {
      return alert('There is no selected captcha. Please, submit captcha first.');
    }
    const message = {
      name: this.nameVal,
      email: this.emailVal,
      message: this.messageVal,
      recaptcha: this.captchaResponse
    }

    this.messagesService.sendMessage(message).subscribe(data => {
      if (data.success) {
        form.reset();
        this.reloadCaptcha();
        return this._flashMessagesService.show(data.msg, {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
      }
      this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
    // }, err => {
    //   this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
    });
  }

  getResponse(): void {
    this.captchaResponse = this.captchaElem.getResponse();
    if (!this.captchaResponse) {
      alert('There is no selected captcha - have you submitted captcha?');
    } else {
      alert(this.captchaResponse);
    }
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
  }

  reloadCaptcha(): void {
    this.captchaElem.reloadCaptcha();
  }

}
