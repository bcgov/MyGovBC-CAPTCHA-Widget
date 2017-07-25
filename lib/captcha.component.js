"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const captcha_data_service_1 = require('./captcha.data.service');
let CaptchaComponent = class CaptchaComponent {
    constructor(dataService, cd) {
        this.dataService = dataService;
        this.cd = cd;
        this.onValidToken = new core_1.EventEmitter();
        this.userAnswerCorrect = null;
        this.errorFetchingImg = null;
        this.errorVerifyAnswer = null;
        this.validation = "";
        this.audio = "";
        this.answer = "";
    }
    ngAfterViewInit() {
        this.getNewCaptcha(false);
        this.cd.detectChanges();
    }
    answerChanged(event) {
        if (this.answer.length < 6) {
            this.incorrectAnswer = null;
        }
        if (this.answer.length === 6) {
            this.state = CAPTCHA_STATE.VERIFYING_ANSWER;
            this.incorrectAnswer = null;
            this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe((res) => {
                let payload = res.json();
                if (this.isValidPayload(payload)) {
                    this.handleVerify(payload);
                }
                else {
                    this.state = CAPTCHA_STATE.ERROR_VERIFY;
                    this.errorVerifyAnswer = this.createErrorTextLine(res);
                }
            }, (error) => {
                this.state = CAPTCHA_STATE.ERROR_VERIFY;
                this.errorVerifyAnswer = this.createErrorTextLine(error);
                console.log('Error response from verifying user answer: %o', error);
            });
        }
    }
    handleVerify(payload) {
        if (payload.valid === true) {
            this.state = CAPTCHA_STATE.SUCCESS_VERIFY_ANSWER_CORRECT;
            this.onValidToken.emit(payload.jwt);
        }
        else {
            this.incorrectAnswer = true;
            this.answer = "";
            this.audio = "";
            this.getNewCaptcha(true);
        }
    }
    isValidPayload(payload) {
        console.debug('Response payload: %o', payload);
        if (!payload) {
            console.error("payload cannot be null or undefined or 0");
            return false;
        }
        else {
            let hasValueProp = payload.hasOwnProperty('valid');
            if (!hasValueProp) {
                console.error('payload must have its own property named \'valid\'');
                return false;
            }
            else {
                return true;
            }
        }
    }
    retryFetchCaptcha() {
        this.state = undefined;
        setTimeout(() => {
            this.getNewCaptcha(false);
        }, 200);
    }
    playAudio() {
        if (this.audio && this.audio.length > 0) {
            this.audioElement.nativeElement.play();
        }
        else {
            this.dataService.fetchAudio(this.apiBaseUrl, this.validation).subscribe((response) => {
                let payload = response.json();
                this.audio = payload.audio;
                this.cd.detectChanges();
                this.audioElement.nativeElement.play();
            }, (error) => {
                console.log('Error response from fetching audio CAPTCHA: %o', error);
                this.cd.detectChanges();
            });
        }
    }
    getNewCaptcha(errorCase) {
        console.log("Fetching new captcha image.");
        this.state = CAPTCHA_STATE.FETCHING_CAPTCHA_IMG;
        this.audio = "";
        if (!errorCase) {
            this.userAnswerCorrect = null;
        }
        this.dataService.fetchData(this.apiBaseUrl, this.nonce).subscribe((response) => {
            this.state = CAPTCHA_STATE.SUCCESS_FETCH_IMG;
            let payload = response.json();
            this.imageContainer.nativeElement.innerHTML = payload.captcha;
            this.validation = payload.validation;
            this.cd.detectChanges();
        }, (error) => {
            this.state = CAPTCHA_STATE.ERROR_FETCH_IMG;
            this.incorrectAnswer = null;
            this.errorFetchingImg = this.createErrorTextLine(error);
            console.log('Error esponse from fetching CAPTCHA text: %o', error);
            this.cd.detectChanges();
        });
    }
    createErrorTextLine(error) {
        let line = 'Error status: ' + error.status;
        if (error.statusText) {
            line = line + ', status text ' + error.statusText;
        }
    }
};
__decorate([
    core_1.ViewChild('image'), 
    __metadata('design:type', core_1.ElementRef)
], CaptchaComponent.prototype, "imageContainer", void 0);
__decorate([
    core_1.ViewChild('audioElement'), 
    __metadata('design:type', core_1.ElementRef)
], CaptchaComponent.prototype, "audioElement", void 0);
__decorate([
    core_1.Input('apiBaseUrl'), 
    __metadata('design:type', String)
], CaptchaComponent.prototype, "apiBaseUrl", void 0);
__decorate([
    core_1.Input('nonce'), 
    __metadata('design:type', String)
], CaptchaComponent.prototype, "nonce", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], CaptchaComponent.prototype, "onValidToken", void 0);
CaptchaComponent = __decorate([
    core_1.Component({
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
          Incorrect answer, plese try again.
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
        providers: [captcha_data_service_1.DataService]
    }), 
    __metadata('design:paramtypes', [captcha_data_service_1.DataService, core_1.ChangeDetectorRef])
], CaptchaComponent);
exports.CaptchaComponent = CaptchaComponent;
var CAPTCHA_STATE;
(function (CAPTCHA_STATE) {
    CAPTCHA_STATE[CAPTCHA_STATE["FETCHING_CAPTCHA_IMG"] = 1] = "FETCHING_CAPTCHA_IMG";
    CAPTCHA_STATE[CAPTCHA_STATE["SUCCESS_FETCH_IMG"] = 2] = "SUCCESS_FETCH_IMG";
    CAPTCHA_STATE[CAPTCHA_STATE["ERROR_FETCH_IMG"] = 3] = "ERROR_FETCH_IMG";
    CAPTCHA_STATE[CAPTCHA_STATE["VERIFYING_ANSWER"] = 4] = "VERIFYING_ANSWER";
    CAPTCHA_STATE[CAPTCHA_STATE["SUCCESS_VERIFY_ANSWER_CORRECT"] = 5] = "SUCCESS_VERIFY_ANSWER_CORRECT";
    CAPTCHA_STATE[CAPTCHA_STATE["ERROR_VERIFY"] = 6] = "ERROR_VERIFY";
})(CAPTCHA_STATE || (CAPTCHA_STATE = {}));
//# sourceMappingURL=/Users/yiling/work/MyGovBC-CAPTCHA-Widget/src/captcha.component.js.map