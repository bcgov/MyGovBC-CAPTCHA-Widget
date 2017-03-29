import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],

})

export class AppComponent {
  title = 'MyGovBC Captcha Widget Test Harness';
  api = "http://localhost:3000";
  // api = "http://localhost:8000/msp/api/captcha-local/captcha";
  token:string;

  validToken (event: string) {
    console.log('valid token received: %s' + event);
    this.token = event;
  }
}
