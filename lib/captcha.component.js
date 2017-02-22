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
    constructor(dataService) {
        this.dataService = dataService;
        this.onValidToken = new core_1.EventEmitter();
        this.captchaValid = null;
        this.validation = "";
        this.answer = "";
    }
    ngAfterViewInit() {
        this.getNewCaptcha(false);
    }
    answerChanged(event) {
        if (this.answer.length == 4) {
            this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe((res) => this.handleVerify(res));
        }
    }
    handleVerify(payload) {
        if (payload.valid === true) {
            this.captchaValid = true;
            this.onValidToken.emit(payload.jwt);
        }
        else {
            this.captchaValid = false;
            this.getNewCaptcha(true);
        }
    }
    getNewCaptcha(errorCase) {
        console.log("getting new captcha.");
        if (!errorCase) {
            this.captchaValid = null;
        }
        this.dataService.fetchData(this.apiBaseUrl, this.nonce).subscribe((res) => this.handleCaptcha(res));
    }
    handleCaptcha(payload) {
        this.imageContainer.nativeElement.innerHTML = payload.captcha;
        this.validation = payload.validation;
    }
};
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
__decorate([
    core_1.ViewChild('image'), 
    __metadata('design:type', core_1.ElementRef)
], CaptchaComponent.prototype, "imageContainer", void 0);
CaptchaComponent = __decorate([
    core_1.Component({
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
        providers: [captcha_data_service_1.DataService]
    }), 
    __metadata('design:paramtypes', [captcha_data_service_1.DataService])
], CaptchaComponent);
exports.CaptchaComponent = CaptchaComponent;
//# sourceMappingURL=captcha.component.js.map