import {Component, ElementRef, ViewChild, 
  ChangeDetectorRef, Output, Input, AfterViewInit, EventEmitter} from '@angular/core';
import {DataService} from './captcha.data.service';
import { Response } from '@angular/http';

@Component({
  selector: 'captcha',
  template: `
<div>
  <form style="clear:both">
    <div [ngClass]="{'has-error': !!incorrectAnswer}">
      <div>
        
        <div class="spinner-box" *ngIf="!state || state === 1">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>
        </div>
        
        <div [ngClass]="{'captcha-box-visible': state === 2, 'captcha-box-invisible': state !== 2}">
          <div>
            <div style="float: left;" #image class="captcha-image"></div>
            <audio #audioElement *ngIf="audio && audio.length > 0" id="audioElement" [src]="audio">
              Your browser does not support the audio element.
            </audio>
            <p style="float: left;">
              <a class="try-another-image" href="javascript:void(0)" (click)="playAudio()" role="button">
                <i class="fa fa-play-circle-o" aria-hidden="true" role="alert"></i> Play Audio
              </a><br>
              <a class="try-another-image" href="javascript:void(0)" (click)="retryFetchCaptcha()" role="button">
                <i class="fa fa-refresh" aria-hidden="true"></i> Try another image
              </a>
            </p>
          </div>
          <div style="clear:both;"></div>
          <div>
            <label for="answer">Enter the text you either see in the orange box or you hear in the audio</label>
            <div class="user-input">
              <input 
                type="text"
                class="form-control"
                id="answer"
                [(ngModel)]="answer"
                (input)="answerChanged($event)"
                name="answer"
                maxlength="6"
                required
                autocorrect="off" 
                autocapitalize="none">
            </div>
          </div>
        </div>

        <div class="error-captcha" *ngIf="state === 3" role="alert" aria-live="assertive">
          <i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i>
          <span> Error happened while retreiving image. please 
            <a href="javascript:void(0)" (click)="retryFetchCaptcha()">click here</a> 
              to try again
          </span>
          <p>
            {{errorFetchingImg}}
          </p>
        </div>
        
        <div class="spinner-box" *ngIf="state == 4" role="alert" aria-live="assertive">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          <span>Verifying your answer...</span>
        </div>
        <div class="error-captcha" *ngIf="state === 6"  role="alert" aria-live="assertive">
          <i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i>
          <span> Error happened while verifying your answer. please 
            <a href="javascript:void(0)" (click)="retryFetchCaptcha()">click here</a> 
              to try again
          </span>
          <p>
          </p>
        </div>
        
        <div class="text-danger" *ngIf="incorrectAnswer === true" role="alert" aria-live="assertive">
          Incorrect answer, please try again.
        </div>
      </div>
    </div>
  </form>
  <div class="confirm-correct-answer" *ngIf="state === 5" role="alert" aria-live="assertive">
    <i class="fa fa-check success fa-2x" aria-hidden="true"></i> 
    Correct. You can submit your application now.
  </div>
</div>
  
  `,
  styles: [`
    .confirm-correct-answer {
      display:block;
      
    }
    .confirm-correct-answer i {
      color: green;
    }
    .spinner-box {
      height: 60px;
      margin: 6px 10px 6px 10px;
    }

    .error-captcha {
      margin-left: 10px;
    }
    .error-captcha i {
      color: darkorange;
    }
    .error-captcha p{
      margin-left: 32px;
    }

    .user-input {
      width: 300px;
    }

    .captcha-box-visible {
      display: block
    }

    .captcha-box-invisible{
      display: none
    }  

    .image-box {
      position:relative
    }

    .captcha-image {
      display: inline-block;
      border: 1px solid darkorange;
    }
    .try-another-image {
      vertical-align:text-top;
      display: inline-block;
      margin-left: 5px;
    }


  `],
  providers: [DataService]
})
export class CaptchaComponent implements AfterViewInit {
  @ViewChild('image') imageContainer: ElementRef;
  @ViewChild('audioElement') audioElement: ElementRef;
  @Input('apiBaseUrl') apiBaseUrl: string;
  @Input('nonce') nonce: string;
  @Output() onValidToken = new EventEmitter<string>();


  userAnswerCorrect: boolean = null;
  /**
   * Http error response for fetching a CAPTCHA image.
   */
  errorFetchingImg = null;

  /**
   * Http error response for verifying user's answer.
   */
  errorVerifyAnswer = null;

  private validation = "";
  private audio = "";
  private answer = "";

  state:CAPTCHA_STATE;
  incorrectAnswer:boolean;


  constructor(private dataService: DataService,
    private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.getNewCaptcha(false);

    // this.getNewCaptcha(false);
    this.cd.detectChanges();
  }

  answerChanged (event:any) {
    if(this.answer.length < 6){
      this.incorrectAnswer = null;
    }
    if (this.answer.length === 6) {
      this.state = CAPTCHA_STATE.VERIFYING_ANSWER;
      this.incorrectAnswer = null;
      this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe(
        (res:Response) => {
          let payload = res.json();
          if( this.isValidPayload(payload)){
            this.handleVerify(payload);
          }else{
            this.state = CAPTCHA_STATE.ERROR_VERIFY;
            this.errorVerifyAnswer = this.createErrorTextLine(res);
          }
        },
        (error:Response) => {
          this.state = CAPTCHA_STATE.ERROR_VERIFY;
          this.errorVerifyAnswer = this.createErrorTextLine(error);
          console.log('Error response from verifying user answer: %o', error);
        }
      );
    }
  }

  // Call the backend to see if our answer is correct
  private handleVerify(payload:any) {
    //There could be the rare change where an invalid payload response is received.
    if (payload.valid === true) {
      this.state = CAPTCHA_STATE.SUCCESS_VERIFY_ANSWER_CORRECT;
      this.onValidToken.emit(payload.jwt);
    } else {
      this.incorrectAnswer = true;
      this.answer = "";
      this.audio = "";
      // They failed - try a new one.
      this.getNewCaptcha(true);
    }
  }

  /**
   * Case where HTTP 200 response code is received by the payload is incorrect or corrupt.
   * The occurance of this type of case should be rare.
   * @param payload 
   */
  private isValidPayload(payload){
    console.debug('Response payload: %o', payload);
    if(!payload){
      console.error("payload cannot be null or undefined or 0");
      return false;
    }else{
      let hasValueProp = payload.hasOwnProperty('valid');
      if(!hasValueProp){
        console.error('payload must have its own property named \'valid\'');
        return false;
      }else{
        return true;
      }
    }
  }

  public retryFetchCaptcha() {
    this.state = undefined;

    /**
     * wait for 0.5 seond before resubmitting
     */
    setTimeout(() => {
      this.getNewCaptcha(false)
    }, 200);
  }

  public playAudio() {
    if (this.audio && this.audio.length > 0) {
       this.audioElement.nativeElement.play();
    }
    else {
      this.dataService.fetchAudio(this.apiBaseUrl, this.validation).subscribe(
        (response: Response) => {

          let payload = response.json();
          this.audio = payload.audio;
          this.cd.detectChanges();
          this.audioElement.nativeElement.play();
        },
        (error: Response) => {
          console.log('Error response from fetching audio CAPTCHA: %o', error);
          this.cd.detectChanges();
        }
      );
    }
  }

  public getNewCaptcha(errorCase:any) {
    console.log("Fetching new captcha image.");
    this.state = CAPTCHA_STATE.FETCHING_CAPTCHA_IMG;
    this.audio = "";

    // Reset things
    if (!errorCase) {
      // Let them know they failed instead of wiping out the answer area
      // Contructing this form on page load/reload will have errorCase = false
      this.userAnswerCorrect = null;
    }

    this.dataService.fetchData(this.apiBaseUrl, this.nonce).subscribe(
      (response:Response) => {
        this.state = CAPTCHA_STATE.SUCCESS_FETCH_IMG;

        let payload = response.json();
        this.imageContainer.nativeElement.innerHTML = payload.captcha;
        this.validation = payload.validation;
        this.cd.detectChanges();
      },
      (error:Response) => {
        this.state = CAPTCHA_STATE.ERROR_FETCH_IMG;
        this.incorrectAnswer = null;
        this.errorFetchingImg = this.createErrorTextLine(error);
        console.log('Error esponse from fetching CAPTCHA text: %o', error);
        this.cd.detectChanges();
      }
    );
  }

  private createErrorTextLine(error:Response){

    let line = 'Error status: ' + error.status;
    if(error.statusText){
      line = line + ', status text ' + error.statusText;
    }
  }
}

/**
 * 7 mutually exclusive states, the program can only be in one of these state
 * at any given point..
 */
enum CAPTCHA_STATE {
  FETCHING_CAPTCHA_IMG = 1,
  SUCCESS_FETCH_IMG = 2,
  ERROR_FETCH_IMG = 3,
  VERIFYING_ANSWER = 4,
  SUCCESS_VERIFY_ANSWER_CORRECT = 5,
  //http error during verification call.
  ERROR_VERIFY = 6,
  // SUCCESS_VERIFY_ANSWER_INCORRECT = 6,
}