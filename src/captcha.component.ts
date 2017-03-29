import {Component, ElementRef, ViewChild, 
  ChangeDetectorRef, Output, Input, AfterViewInit, EventEmitter} from '@angular/core';
import {DataService} from './captcha.data.service';
import { Response } from '@angular/http';

@Component({
  selector: 'captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css'],
  providers: [DataService]
})
export class CaptchaComponent implements AfterViewInit {
  @ViewChild('image') imageContainer: ElementRef;
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
  private answer = "";

  state:CAPTCHA_STATE;
  incorrectAnswer:boolean;


  constructor(private dataService: DataService,
    private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.getNewCaptcha(false);
    }, 400);

    // this.getNewCaptcha(false);
    this.cd.detectChanges();
  }

  answerChanged (event:any) {
    if (this.answer.length === 6) {
      this.state = CAPTCHA_STATE.VERIFYING_ANSWER;
      this.incorrectAnswer = null;
      this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe(
        (res:Response) => {
          this.handleVerify(res.json());
        },
        (error:Response) => {
          this.state = CAPTCHA_STATE.ERROR_VERIFY;
          this.errorVerifyAnswer = this.createErrorTextLine(error);
          console.log('Error esponse from verifying user answer: %o', error);
        }
      );
    }
  }

  // Call the backend to see if our answer is correct
  private handleVerify(payload:any) {
    if (payload.valid === true) {
      // setTimeout( () => {
      //   this.state = CAPTCHA_STATE.SUCCESS_VERIFY_ANSWER_CORRECT;
      //   this.onValidToken.emit(payload.jwt);
      // }, 2000);
      this.state = CAPTCHA_STATE.SUCCESS_VERIFY_ANSWER_CORRECT;
      this.onValidToken.emit(payload.jwt);
    } else {

      this.incorrectAnswer = true;
      // They failed - try a new one.
      this.getNewCaptcha(true);
    }
  }

  public retryFetchCaptcha() {
    this.state = undefined;
    setTimeout(() => {
      this.getNewCaptcha(false)
    }, 1000);
  }

  public getNewCaptcha(errorCase:any) {
    console.log("getting new captcha.");
    this.state = CAPTCHA_STATE.FETCHING_CAPTCHA_IMG;
    
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