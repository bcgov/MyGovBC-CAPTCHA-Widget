var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { DataService } from './captcha.data.service';
export var CaptchaComponent = (function () {
    function CaptchaComponent(dataService) {
        this.dataService = dataService;
        this.onValidToken = new EventEmitter();
        this.captchaValid = null;
        this.validation = "";
        this.answer = "";
    }
    CaptchaComponent.prototype.ngAfterViewInit = function () {
        this.getNewCaptcha(false);
    };
    CaptchaComponent.prototype.answerChanged = function (event) {
        var _this = this;
        if (this.answer.length == 4) {
            this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe(function (res) { return _this.handleVerify(res); });
        }
    };
    CaptchaComponent.prototype.handleVerify = function (payload) {
        if (payload.valid === true) {
            this.captchaValid = true;
            this.onValidToken.emit(payload.jwt);
        }
        else {
            this.captchaValid = false;
            this.getNewCaptcha(true);
        }
    };
    CaptchaComponent.prototype.getNewCaptcha = function (errorCase) {
        var _this = this;
        console.log("getting new captcha.");
        if (!errorCase) {
            this.captchaValid = null;
        }
        this.dataService.fetchData(this.apiBaseUrl, this.nonce).subscribe(function (res) { return _this.handleCaptcha(res); });
    };
    CaptchaComponent.prototype.handleCaptcha = function (payload) {
        this.imageContainer.nativeElement.innerHTML = payload.captcha;
        this.validation = payload.validation;
    };
    __decorate([
        Input('apiBaseUrl'), 
        __metadata('design:type', String)
    ], CaptchaComponent.prototype, "apiBaseUrl", void 0);
    __decorate([
        Input('nonce'), 
        __metadata('design:type', String)
    ], CaptchaComponent.prototype, "nonce", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], CaptchaComponent.prototype, "onValidToken", void 0);
    __decorate([
        ViewChild('image'), 
        __metadata('design:type', ElementRef)
    ], CaptchaComponent.prototype, "imageContainer", void 0);
    CaptchaComponent = __decorate([
        Component({
            selector: 'captcha',
            template: "\n<form>\n  <div class=\"form-group\" [ngClass]=\"{'has-error': captchaValid == false}\">\n    <div *ngIf=\"!captchaValid\" class=\"col-sm-4\">\n      <div #image></div>\n      <label for=\"answer\">Enter the text you see above</label>\n      <input \n        type=\"text\"\n        class=\"form-control\"\n        id=\"answer\"\n        [(ngModel)]=\"answer\"\n        (input)=\"answerChanged($event)\"\n        name=\"answer\"\n        maxlength=\"4\"\n        required>\n       <div class=\"text-danger\" *ngIf=\"captchaValid == false\">\n        Incorrect answer, try again\n      </div>\n    </div>\n    <div *ngIf=\"captchaValid\" class=\"col-sm-4\">\n      <i class=\"fa fa-check success\" aria-hidden=\"true\"></i> Correct\n    </div>\n  </div>\n</form>\n",
            providers: [DataService]
        }), 
        __metadata('design:paramtypes', [DataService])
    ], CaptchaComponent);
    return CaptchaComponent;
}());
//# sourceMappingURL=c:/mygovbc/MyGovBC-CAPTCHA-Widget/src/captcha.component.js.map