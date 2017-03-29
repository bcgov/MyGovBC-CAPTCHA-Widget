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
var core_1 = require('@angular/core');
var captcha_data_service_1 = require('./captcha.data.service');
var CaptchaComponent = (function () {
    function CaptchaComponent(dataService, cd) {
        this.dataService = dataService;
        this.cd = cd;
        this.onValidToken = new core_1.EventEmitter();
        this.userAnswerCorrect = null;
        this.errorFetchingImg = null;
        this.errorVerifyAnswer = null;
        this.validation = "";
        this.answer = "";
    }
    CaptchaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.getNewCaptcha(false);
        }, 400);
        this.cd.detectChanges();
    };
    CaptchaComponent.prototype.answerChanged = function (event) {
        var _this = this;
        if (this.answer.length === 6) {
            this.state = CAPTCHA_STATE.VERIFYING_ANSWER;
            this.incorrectAnswer = null;
            this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe(function (res) {
                _this.handleVerify(res.json());
            }, function (error) {
                _this.state = CAPTCHA_STATE.ERROR_VERIFY;
                _this.errorVerifyAnswer = _this.createErrorTextLine(error);
                console.log('Error esponse from verifying user answer: %o', error);
            });
        }
    };
    CaptchaComponent.prototype.handleVerify = function (payload) {
        if (payload.valid === true) {
            this.state = CAPTCHA_STATE.SUCCESS_VERIFY_ANSWER_CORRECT;
            this.onValidToken.emit(payload.jwt);
        }
        else {
            this.incorrectAnswer = true;
            this.getNewCaptcha(true);
        }
    };
    CaptchaComponent.prototype.retryFetchCaptcha = function () {
        var _this = this;
        this.state = undefined;
        setTimeout(function () {
            _this.getNewCaptcha(false);
        }, 1000);
    };
    CaptchaComponent.prototype.getNewCaptcha = function (errorCase) {
        var _this = this;
        console.log("getting new captcha.");
        this.state = CAPTCHA_STATE.FETCHING_CAPTCHA_IMG;
        if (!errorCase) {
            this.userAnswerCorrect = null;
        }
        this.dataService.fetchData(this.apiBaseUrl, this.nonce).subscribe(function (response) {
            _this.state = CAPTCHA_STATE.SUCCESS_FETCH_IMG;
            var payload = response.json();
            _this.imageContainer.nativeElement.innerHTML = payload.captcha;
            _this.validation = payload.validation;
            _this.cd.detectChanges();
        }, function (error) {
            _this.state = CAPTCHA_STATE.ERROR_FETCH_IMG;
            _this.incorrectAnswer = null;
            _this.errorFetchingImg = _this.createErrorTextLine(error);
            console.log('Error esponse from fetching CAPTCHA text: %o', error);
            _this.cd.detectChanges();
        });
    };
    CaptchaComponent.prototype.createErrorTextLine = function (error) {
        var line = 'Error status: ' + error.status;
        if (error.statusText) {
            line = line + ', status text ' + error.statusText;
        }
    };
    __decorate([
        core_1.ViewChild('image'), 
        __metadata('design:type', core_1.ElementRef)
    ], CaptchaComponent.prototype, "imageContainer", void 0);
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
            template: "\n  <div>\n  <form style=\"clear:both\">\n    <div [ngClass]=\"{'has-error': !!incorrectAnswer}\">\n      <div>\n        <div class=\"spinner-box\" *ngIf=\"!state || state === 1\">\n          <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n        </div>\n        \n        <div [ngClass]=\"{'captcha-box-visible': state === 2, 'captcha-box-invisible': state !== 2}\">\n          <div #image></div>\n          <div class=\"user-input\">\n            <label for=\"answer\">Enter the text you see above (case sensitive)</label>\n            <input \n              type=\"text\"\n              class=\"form-control\"\n              id=\"answer\"\n              [(ngModel)]=\"answer\"\n              (input)=\"answerChanged($event)\"\n              name=\"answer\"\n              maxlength=\"6\"\n              required\n              autocorrect=\"off\" \n              autocapitalize=\"none\">\n          </div>\n        </div>\n\n        <div class=\"error-captcha\" *ngIf=\"state === 3\">\n          <i class=\"fa fa-exclamation-triangle fa-2x\" aria-hidden=\"true\"></i>\n          <span> Error happened while retreiving image. please \n            <a href=\"javascript:void(0)\" (click)=\"retryFetchCaptcha()\">click here</a> \n              to try again\n          </span>\n          <p>\n            {{errorFetchingImg}}\n          </p>\n        </div>\n        \n        <div class=\"spinner-box\" *ngIf=\"state == 4\">\n          <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n          <span>Verifying your answer...</span>\n        </div>\n        <div class=\"error-captcha\" *ngIf=\"state === 6\">\n          <i class=\"fa fa-exclamation-triangle fa-2x\" aria-hidden=\"true\"></i>\n          <span> Error happened while verifying your answer. please \n            <a href=\"javascript:void(0)\" (click)=\"retryFetchCaptcha()\">click here</a> \n              to try again\n          </span>\n          <p>\n          </p>\n        </div>\n        \n        <div class=\"text-danger\" *ngIf=\"incorrectAnswer === true && state !== 5\">\n          Incorrect answer, plese try again.\n        </div>\n      </div>\n    </div>\n  </form>\n  <div class=\"confirm-correct-answer\" *ngIf=\"state === 5\">\n    <i class=\"fa fa-check success fa-2x\" aria-hidden=\"true\"></i> \n    Correct. You can submit your application now.\n  </div>\n</div>\n\n  ",
            styles: ["\n  .confirm-correct-answer {\n  display:block;\n  \n}\n.confirm-correct-answer i {\n  color: green;\n}\n.spinner-box {\n  height: 60px;\n  margin: 6px 10px 6px 10px;\n}\n\n.error-captcha {\n  margin-left: 10px;\n}\n.error-captcha i {\n  color: darkorange;\n}\n.error-captcha p{\n  margin-left: 32px;\n}\n\n.user-input {\n  width: 300px;\n}\n\n.captcha-box-visible {\n  display: block\n}\n\n.captcha-box-invisible{\n  display: none\n}\n  "],
            providers: [captcha_data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [captcha_data_service_1.DataService, core_1.ChangeDetectorRef])
    ], CaptchaComponent);
    return CaptchaComponent;
}());
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