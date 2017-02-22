import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],

})

export class AppComponent {
  title = 'MyGovBC Captcha Widget Test Harness';
  api = "http://localhost:3000";
  token:string;

  validToken (event: string) {
    this.token = event;
  }
}
