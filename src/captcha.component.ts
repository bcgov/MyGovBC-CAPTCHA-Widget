import {Component, ElementRef, ViewChild, Output, Input, AfterViewInit, EventEmitter} from '@angular/core';
import {DataService} from './captcha.data.service';

@Component({
  selector: 'captcha',
  template: `
<form>
  <div class="form-group" [ngClass]="{'has-error': captchaValid == false}">
    <div *ngIf="!captchaValid" class="col-sm-4">
      <div #image></div>
      <label for="answer">Enter the text you see above</label>
      <input 
        type="text"
        class="form-control"
        id="answer"
        [(ngModel)]="answer"
        (change)="answerChanged($event)"
        name="answer"
        maxlength="4"
        required>
       <div class="text-danger" *ngIf="captchaValid == false">
        Incorrect answer, try again
      </div>
    </div>
    <div *ngIf="captchaValid"><i class="fa fa-check success" aria-hidden="true"></i> Correct</div>
  </div>
</form>
`,
  providers: [DataService]
})

export class CaptchaComponent implements AfterViewInit {

  @Input('apiBaseUrl') apiBaseUrl: string;
  @Input('nonce') nonce: string;
  @Output() onValidToken = new EventEmitter<string>();

  captchaValid: boolean = null;

  private validation = "";
  private answer = "";

  @ViewChild('image') imageContainer: ElementRef;

  constructor(private dataService: DataService) {

  }

  ngAfterViewInit() {
    this.getNewCaptcha(false);
  }

  answerChanged (event) {
    if (this.answer.length == 4) {
      this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe(
        (res) => this.handleVerify(res)
      );
    }
  }

  // Call the backend to see if our answer is correct
  private handleVerify(payload) {
    if (payload.valid === true) {
      this.captchaValid = true;
      this.onValidToken.emit(payload.jwt);
    } else {
      this.captchaValid = false;
      // They failed - try a new one.
      this.getNewCaptcha(true);
    }
  }

  public getNewCaptcha(errorCase) {
    console.log("getting new captcha.");
    // Reset things
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
    this.imageContainer.nativeElement.innerHTML = payload.captcha;
    this.validation = payload.validation;
  }
}
