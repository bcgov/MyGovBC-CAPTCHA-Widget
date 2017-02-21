import {Component, ElementRef, ViewChild, Output, Input, AfterViewInit} from '@angular/core';
import {DataService} from './captcha.data.service';

@Component({
  selector: 'captcha',
  template: `<div class="container">
  <div class="form-group row">
    <div class="col-sm-4">
      <label>Captcha Image:</label>
      <div #image></div>
      <button class="btn btn-success" (click)="getNewCaptcha()">Refresh</button>
    </div>
  </div>
</div>
<div class="container">
  <form>
    <div class="form-group row">
      <div class="col-sm-4">
        <label for="answer">Enter The Text You See Above:</label>
        <input
          type="text"
          class="form-control"
          id="answer"
          [(ngModel)]="answer"
          name="answer"
          required>
      </div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success">Submit</button>
    </div>
  </form>
  <div class="form-group row">
    <div *ngIf="captchaValid != null && captchaValid != false" class="col-sm-4 glyphicon glyphicon-ok"> Correct!</div>
    <div *ngIf="captchaValid == false" class="col-sm-4 glyphicon glyphicon-remove"> Incorrect Answer!</div>
  </div>
</div>
`,
  providers: [DataService]
})

export class CaptchaComponent implements AfterViewInit {

  @Input('apiBaseUrl') apiBaseUrl: string;
  @Input('nonce') nonce: string;
  @Output('valid') captchaValid: boolean = null;
  @Output('token') jwt: string;
  validation = "";
  answer = "";

  @ViewChild('image') imageContainer: ElementRef;

  constructor(private dataService: DataService) {

  }

  ngAfterViewInit() {
    this.getNewCaptcha(false);
  }

  // Handle form submission
  public onSubmit() {
    // Attempt to validate the user's token.
    // console.log("onsubmit", this.answer);

    this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe(
      (res) => this.handleVerify(res)
    );
  }

  // Call the backend to see if our answer is correct
  private handleVerify(payload) {
    // console.log("payload response:", payload);

    if (payload.valid === true) {
      this.captchaValid = true;
      this.jwt = payload.jwt;
    } else {
      this.captchaValid = false;
      // They failed - try a new one.
      this.getNewCaptcha(true);
    }
  }

  public getNewCaptcha(errorCase) {
    console.log("getting new captcha.");
    // Reset things
    this.jwt = "";
    if (!errorCase) {
      // Let them know they failed instead of wiping out the answer area
      // Contructing this form on page load/reload will have errorCase = false
      this.captchaValid = null;
    }
    this.dataService.fetchData(this.apiBaseUrl, this.nonce).subscribe(
      (res) => this.handleCaptcha(res)
    );
  }

  // We received a payload from the server - apply it to our form.
  private handleCaptcha(payload) {
    // console.log("payload:", payload);

    this.imageContainer.nativeElement.innerHTML = payload.captcha;
    this.validation = payload.validation;
  }
}
