import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor() {

  }
  selectedLanguage = 'en'
  supportedLanguages = [['zh', 'Chinese'], ['en', 'English'],['fr','French'],['pa','Punjabi']]
  public handleAuthToken(token) {
    console.log('valid token received: ');
  }
}
