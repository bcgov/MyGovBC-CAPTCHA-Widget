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
    constructor(dataService, element) {
        this.dataService = dataService;
        this.element = element;
        this.captchaValid = null;
        this.validation = "";
        this.answer = "";
        this.getNewCaptcha(false);
    }
    onSubmit() {
        this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe((res) => this.handleVerify(res));
    }
    handleVerify(payload) {
        if (payload.valid === true) {
            this.captchaValid = true;
            this.jwt = payload.jwt;
        }
        else {
            this.captchaValid = false;
            this.getNewCaptcha(true);
        }
    }
    getNewCaptcha(errorCase) {
        console.log("getting new captcha.");
        this.jwt = "";
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
    core_1.Output('valid'), 
    __metadata('design:type', Boolean)
], CaptchaComponent.prototype, "captchaValid", void 0);
__decorate([
    core_1.Output('token'), 
    __metadata('design:type', String)
], CaptchaComponent.prototype, "jwt", void 0);
__decorate([
    core_1.ViewChild('image'), 
    __metadata('design:type', core_1.ElementRef)
], CaptchaComponent.prototype, "imageContainer", void 0);
CaptchaComponent = __decorate([
    core_1.Component({
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
        providers: [captcha_data_service_1.DataService]
    }), 
    __metadata('design:paramtypes', [captcha_data_service_1.DataService, core_1.ElementRef])
], CaptchaComponent);
exports.CaptchaComponent = CaptchaComponent;
//# sourceMappingURL=captcha.component.js.map