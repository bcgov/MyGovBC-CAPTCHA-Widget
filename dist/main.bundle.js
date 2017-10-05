webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    BC Gov. CAPTCHA Widget Source Code and Demo\n  </h1>\n  <div>\n\n    <captcha \n      apiBaseUrl=\"https://captcha-service-gcpe-mygovbc-demo.pathfinder.gov.bc.ca\" \n      nonce=\"BCGov Captcha Demo\" \n      successMessage=\"You can save or submit form now.\"\n      eagerFetchAudio = \"true\"\n      (onValidToken)=\"handleAuthToken($event)\">\n    </captcha>    \n\n  </div>\n\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent.prototype.handleAuthToken = function (token) {
        console.log('valid token received: ');
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var captcha_component_1 = __webpack_require__("../../../../../src/app/captcha/captcha.component.ts");
var captcha_data_service_1 = __webpack_require__("../../../../../src/app/captcha-data.service.ts");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            captcha_component_1.CaptchaComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule
        ],
        providers: [
            captcha_data_service_1.CaptchaDataService
        ],
        exports: [
            captcha_component_1.CaptchaComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/captcha-data.service.ts":
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/Rx.js");
var CaptchaDataService = (function () {
    function CaptchaDataService(http) {
        this.http = http;
    }
    CaptchaDataService.prototype.fetchData = function (apiBaseUrl, nonce) {
        return this.http.post(apiBaseUrl + '/captcha', { nonce: nonce }, {});
    };
    CaptchaDataService.prototype.verifyCaptcha = function (apiBaseUrl, nonce, answer, encryptedAnswer) {
        return this.http.post(apiBaseUrl + '/verify/captcha', { nonce: nonce, answer: answer, validation: encryptedAnswer }, {});
    };
    CaptchaDataService.prototype.fetchAudio = function (apiBaseUrl, validation) {
        return this.http.post(apiBaseUrl + '/captcha/audio', { validation: validation }, {});
    };
    return CaptchaDataService;
}());
CaptchaDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], CaptchaDataService);
exports.CaptchaDataService = CaptchaDataService;
var _a;
//# sourceMappingURL=captcha-data.service.js.map

/***/ }),

/***/ "../../../../../src/app/captcha/captcha.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n\n\n  <svg style=\"position: absolute; width: 0; height: 0; overflow: hidden\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <defs>\n        <symbol id=\"icon-play-def\" viewBox=\"0 0 32 32\">\n            <path d=\"M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z\"></path>\n        </symbol>  \n\n        <symbol id=\"icon-loop-def\" viewBox=\"0 0 32 32\">\n          <path d=\"M27.802 5.197c-2.925-3.194-7.13-5.197-11.803-5.197-8.837 0-16 7.163-16 16h3c0-7.18 5.82-13 13-13 3.844 0 7.298 1.669 9.678 4.322l-4.678 4.678h11v-11l-4.198 4.197z\"></path>\n          <path d=\"M29 16c0 7.18-5.82 13-13 13-3.844 0-7.298-1.669-9.678-4.322l4.678-4.678h-11v11l4.197-4.197c2.925 3.194 7.13 5.197 11.803 5.197 8.837 0 16-7.163 16-16h-3z\"></path>\n        </symbol>  \n        \n        <symbol id=\"icon-check-def\" viewBox=\"0 0 24 24\">\n          <path d=\"M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z\"></path>\n        </symbol>    \n        \n        <symbol id=\"icon-exclamation-triangle-def\" viewBox=\"0 0 28 28\">\n            <path d=\"M16 21.484v-2.969c0-0.281-0.219-0.516-0.5-0.516h-3c-0.281 0-0.5 0.234-0.5 0.516v2.969c0 0.281 0.219 0.516 0.5 0.516h3c0.281 0 0.5-0.234 0.5-0.516zM15.969 15.641l0.281-7.172c0-0.094-0.047-0.219-0.156-0.297-0.094-0.078-0.234-0.172-0.375-0.172h-3.437c-0.141 0-0.281 0.094-0.375 0.172-0.109 0.078-0.156 0.234-0.156 0.328l0.266 7.141c0 0.203 0.234 0.359 0.531 0.359h2.891c0.281 0 0.516-0.156 0.531-0.359zM15.75 1.047l12 22c0.344 0.609 0.328 1.359-0.031 1.969s-1.016 0.984-1.719 0.984h-24c-0.703 0-1.359-0.375-1.719-0.984s-0.375-1.359-0.031-1.969l12-22c0.344-0.641 1.016-1.047 1.75-1.047s1.406 0.406 1.75 1.047z\"></path>\n        </symbol>\n        \n    </defs>\n  </svg>\n\n\n\n  <form style=\"clear:both\" #formRef=\"ngForm\">\n    <div [ngClass]=\"{'has-error': !!incorrectAnswer}\">\n      <div>\n        \n        <div class=\"spinner-box\" *ngIf=\"!state || state === 1\">\n         <div style=\"float:left; margin: 2px 0 1px 8px\">\n            <svg class=\"lds-spinner\" width=\"45px\"  height=\"45px\"  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" style=\"background: none;\"><g transform=\"rotate(0 50 50)\">\n                <rect x=\"47\" y=\"22\" rx=\"9.4\" ry=\"4.4\" width=\"6\" height=\"16\" fill=\"#1d3f72\">\n                  <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.8888888888888888s\" repeatCount=\"indefinite\"></animate>\n                </rect>\n              </g><g transform=\"rotate(40 50 50)\">\n                <rect x=\"47\" y=\"22\" rx=\"9.4\" ry=\"4.4\" width=\"6\" height=\"16\" fill=\"#1d3f72\">\n                  <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.7777777777777778s\" repeatCount=\"indefinite\"></animate>\n                </rect>\n              </g><g transform=\"rotate(80 50 50)\">\n                <rect x=\"47\" y=\"22\" rx=\"9.4\" ry=\"4.4\" width=\"6\" height=\"16\" fill=\"#1d3f72\">\n                  <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"></animate>\n                </rect>\n              </g><g transform=\"rotate(120 50 50)\">\n                <rect x=\"47\" y=\"22\" rx=\"9.4\" ry=\"4.4\" width=\"6\" height=\"16\" fill=\"#1d3f72\">\n                  <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.5555555555555556s\" repeatCount=\"indefinite\"></animate>\n                </rect>\n              </g><g transform=\"rotate(160 50 50)\">\n                <rect x=\"47\" y=\"22\" rx=\"9.4\" ry=\"4.4\" width=\"6\" height=\"16\" fill=\"#1d3f72\">\n                  <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.4444444444444444s\" repeatCount=\"indefinite\"></animate>\n                </rect>\n              </g><g transform=\"rotate(200 50 50)\">\n                <rect x=\"47\" y=\"22\" rx=\"9.4\" ry=\"4.4\" width=\"6\" height=\"16\" fill=\"#1d3f72\">\n                  <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"></animate>\n                </rect>\n              </g><g transform=\"rotate(240 50 50)\">\n                <rect x=\"47\" y=\"22\" rx=\"9.4\" ry=\"4.4\" width=\"6\" height=\"16\" fill=\"#1d3f72\">\n                  <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.2222222222222222s\" repeatCount=\"indefinite\"></animate>\n                </rect>\n              </g><g transform=\"rotate(280 50 50)\">\n                <rect x=\"47\" y=\"22\" rx=\"9.4\" ry=\"4.4\" width=\"6\" height=\"16\" fill=\"#1d3f72\">\n                  <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.1111111111111111s\" repeatCount=\"indefinite\"></animate>\n                </rect>\n              </g><g transform=\"rotate(320 50 50)\">\n                <rect x=\"47\" y=\"22\" rx=\"9.4\" ry=\"4.4\" width=\"6\" height=\"16\" fill=\"#1d3f72\">\n                  <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"0s\" repeatCount=\"indefinite\"></animate>\n                </rect>\n              </g></svg>\n         </div>\n         <div style=\"float:left; margin: 16px 0 1px 3px\">\n            Loading CAPTCHA image\n         </div>\n         <div style=\"clear:both\"></div>\n        </div>\n        \n        <div [ngClass]=\"{'captcha-box-visible': state === 2, 'captcha-box-invisible': state !== 2}\">\n          <div>\n            <div style=\"float: left;\" #image class=\"captcha-image\"></div>\n            <audio #audioElement *ngIf=\"audio && audio.length > 0\" id=\"audioElement\" [src]=\"audio\">\n              Your browser does not support the audio element.\n            </audio>\n            <div style=\"float: left; margin-top: 8px\">\n              <a class=\"play-audio\" href=\"javascript:void(0)\" (click)=\"playAudio()\" role=\"button\">\n                <svg *ngIf=\"!fetchingAudioInProgress\" class=\"icon-play\"><use xlink:href=\"#icon-play-def\"></use></svg>\n                \n                <svg *ngIf=\"fetchingAudioInProgress\" class=\"lds-spinner\" width=\"15px\"  height=\"15px\"  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" style=\"background: none;\"><g transform=\"rotate(0 50 50)\">\n                  <rect x=\"45\" y=\"9\" rx=\"2.7\" ry=\"0.54\" width=\"10\" height=\"22\" fill=\"#1d3f72\">\n                    <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.8888888888888888s\" repeatCount=\"indefinite\"></animate>\n                  </rect>\n                </g><g transform=\"rotate(40 50 50)\">\n                  <rect x=\"45\" y=\"9\" rx=\"2.7\" ry=\"0.54\" width=\"10\" height=\"22\" fill=\"#1d3f72\">\n                    <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.7777777777777778s\" repeatCount=\"indefinite\"></animate>\n                  </rect>\n                </g><g transform=\"rotate(80 50 50)\">\n                  <rect x=\"45\" y=\"9\" rx=\"2.7\" ry=\"0.54\" width=\"10\" height=\"22\" fill=\"#1d3f72\">\n                    <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"></animate>\n                  </rect>\n                </g><g transform=\"rotate(120 50 50)\">\n                  <rect x=\"45\" y=\"9\" rx=\"2.7\" ry=\"0.54\" width=\"10\" height=\"22\" fill=\"#1d3f72\">\n                    <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.5555555555555556s\" repeatCount=\"indefinite\"></animate>\n                  </rect>\n                </g><g transform=\"rotate(160 50 50)\">\n                  <rect x=\"45\" y=\"9\" rx=\"2.7\" ry=\"0.54\" width=\"10\" height=\"22\" fill=\"#1d3f72\">\n                    <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.4444444444444444s\" repeatCount=\"indefinite\"></animate>\n                  </rect>\n                </g><g transform=\"rotate(200 50 50)\">\n                  <rect x=\"45\" y=\"9\" rx=\"2.7\" ry=\"0.54\" width=\"10\" height=\"22\" fill=\"#1d3f72\">\n                    <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"></animate>\n                  </rect>\n                </g><g transform=\"rotate(240 50 50)\">\n                  <rect x=\"45\" y=\"9\" rx=\"2.7\" ry=\"0.54\" width=\"10\" height=\"22\" fill=\"#1d3f72\">\n                    <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.2222222222222222s\" repeatCount=\"indefinite\"></animate>\n                  </rect>\n                </g><g transform=\"rotate(280 50 50)\">\n                  <rect x=\"45\" y=\"9\" rx=\"2.7\" ry=\"0.54\" width=\"10\" height=\"22\" fill=\"#1d3f72\">\n                    <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"-0.1111111111111111s\" repeatCount=\"indefinite\"></animate>\n                  </rect>\n                </g><g transform=\"rotate(320 50 50)\">\n                  <rect x=\"45\" y=\"9\" rx=\"2.7\" ry=\"0.54\" width=\"10\" height=\"22\" fill=\"#1d3f72\">\n                    <animate attributeName=\"opacity\" values=\"1;0\" times=\"0;1\" dur=\"1s\" begin=\"0s\" repeatCount=\"indefinite\"></animate>\n                  </rect>\n                </g></svg>\n\n                Play Audio\n              </a>\n              <div style=\"clear:both;\"></div>\n              \n              <a class=\"try-another-image\" href=\"javascript:void(0)\" (click)=\"retryFetchCaptcha()\" role=\"button\">\n                  <svg class=\"icon-loop icon-loop-def\"><use xlink:href=\"#icon-loop-def\"></use></svg>                \n                Try another image\n              </a>\n            </div>\n          </div>\n          <div style=\"clear:both; margin-bottom: 8px;\"></div>\n          <div style=\"float:left;\">\n            <label for=\"answer\">\n                Enter the text you either see in the orange box or you hear in the audio\n              <input id=\"answer\" type=\"text\"\n                #userAnswerRef = \"ngModel\"\n                [(ngModel)]=\"answer\"\n                (input)=\"answerChanged($event)\"\n                [ngClass]=\"{'captcha-wrong-answer': userAnswerRef.dirty && incorrectAnswer}\"\n                name=\"answer\"\n                maxlength=\"6\"\n                required\n                autocorrect=\"off\" \n                autocapitalize=\"none\">\n            </label>\n          </div>\n        </div>\n        <div style=\"clear:both;\"></div>\n        <div style=\"float:left;\">\n\n        <div class=\"error-captcha\" *ngIf=\"state === 3\" role=\"alert\" aria-live=\"assertive\">\n          <div style=\"float:left; margin-left: 5px;\">\n            <svg class=\"icon-exclamation-triangle\"><use xlink:href=\"#icon-exclamation-triangle-def\"></use></svg>\n  \n            <span> Error happened while retreiving CAPTCHA image. please \n              <a href=\"javascript:void(0)\" (click)=\"retryFetchCaptcha()\">click here</a> \n                to try again\n            </span>\n          </div>\n          <div style=\"clear:both\"></div>\n          \n          <div style=\"float:left; margin-left: 25px;\">\n              {{errorFetchingImg}}\n          </div>\n          <div style=\"clear:both\"></div>\n        </div>\n        \n        <div class=\"spinner-box\" *ngIf=\"state == 4\" role=\"alert\" aria-live=\"assertive\">\n          <span>Verifying your answer...</span>\n        </div>\n        <div class=\"error-captcha\" *ngIf=\"state === 6\"  role=\"alert\" aria-live=\"assertive\">\n          <svg class=\"icon-exclamation-triangle\"><use xlink:href=\"#icon-exclamation-triangle-def\"></use></svg>\n          <span> Error happened while verifying your answer. please \n            <a href=\"javascript:void(0)\" (click)=\"retryFetchCaptcha()\">click here</a> \n              to try again\n          </span>\n          <p>\n          </p>\n        </div>\n        \n        <div class=\"captcha-error\" style=\"margin-top: 2px\" *ngIf=\"incorrectAnswer === true\" role=\"alert\" aria-live=\"assertive\">\n          Incorrect answer, please try again.\n        </div>\n      </div>\n      \n      </div>\n    </div>\n  </form>\n\n  <div class=\"confirm-correct-answer\" style=\"float:left\" *ngIf=\"state === 5\" role=\"alert\" aria-live=\"assertive\">\n    <svg class=\"icon-check\"><use xlink:href=\"#icon-check-def\"></use></svg>\n    Correct. <span>{{successMessage}}</span>\n  </div>\n  <div style=\"clear:both;\"></div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/captcha/captcha.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".confirm-correct-answer {\n  display: block;\n  color: green; }\n\n.confirm-correct-answer i {\n  color: green; }\n\n.spinner-box {\n  height: 60px;\n  margin: 2px 10px 6px 10px;\n  padding: 5px 10px 5px 18px; }\n\n.error-captcha {\n  margin-left: 10px; }\n\n.error-captcha svg {\n  color: darkorange; }\n\n.error-captcha p {\n  margin-left: 32px; }\n\n.captcha-box-visible {\n  display: block; }\n\n.captcha-box-invisible {\n  display: none; }\n\n.captcha-image {\n  display: inline-block;\n  border: 1px solid gray; }\n\n.play-audio {\n  float: left;\n  display: block;\n  margin-left: 5px;\n  margin-bottom: 3px; }\n\n.try-another-image {\n  display: inline-block;\n  margin-left: 5px; }\n\n.has-error {\n  border-color: #dc3545; }\n  .has-error:focus {\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n\ninput[type=\"text\"] {\n  display: block;\n  margin: 0;\n  width: 100%;\n  font-size: 20px;\n  box-shadow: none;\n  border-radius: none;\n  padding: 6px;\n  border: solid 1px #ccc;\n  transition: box-shadow 0.3s, border 0.3s; }\n  input[type=\"text\"]:focus {\n    border: solid 1px white;\n    box-shadow: 0 0 1px 1px #2196F3; }\n  input[type=\"text\"].captcha-wrong-answer {\n    border: solid 1px #a94442; }\n\ninput[type=\"text\"]:focus {\n  outline: none; }\n\n.captcha-error {\n  color: #a94442; }\n\n.icon-play {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  stroke-width: 0;\n  stroke: currentColor;\n  fill: currentColor; }\n\n.icon-check {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  stroke-width: 0;\n  stroke: currentColor;\n  fill: currentColor; }\n\n.icon-loop {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  stroke-width: 0;\n  stroke: currentColor;\n  fill: currentColor; }\n\n.icon-exclamation-triangle {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  stroke-width: 0;\n  stroke: currentColor;\n  fill: currentColor; }\n\n.spinner {\n  -webkit-animation: rotator 1.4s linear infinite;\n          animation: rotator 1.4s linear infinite; }\n\n@-webkit-keyframes rotator {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n@keyframes rotator {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n.path {\n  stroke-dasharray: 187;\n  stroke-dashoffset: 0;\n  -webkit-transform-origin: center;\n          transform-origin: center;\n  -webkit-animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;\n          animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite; }\n\n@-webkit-keyframes colors {\n  0% {\n    stroke: #9E9E9E; }\n  25% {\n    stroke: #757575; }\n  50% {\n    stroke: #616161; }\n  75% {\n    stroke: #424242; }\n  100% {\n    stroke: #212121; } }\n\n@keyframes colors {\n  0% {\n    stroke: #9E9E9E; }\n  25% {\n    stroke: #757575; }\n  50% {\n    stroke: #616161; }\n  75% {\n    stroke: #424242; }\n  100% {\n    stroke: #212121; } }\n\n@-webkit-keyframes dash {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n\n@keyframes dash {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/captcha/captcha.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var captcha_data_service_1 = __webpack_require__("../../../../../src/app/captcha-data.service.ts");
var CaptchaComponent = (function () {
    function CaptchaComponent(dataService, cd) {
        this.dataService = dataService;
        this.cd = cd;
        this.onValidToken = new core_1.EventEmitter();
        /**
         * Http error response for fetching a CAPTCHA image.
         */
        this.errorFetchingImg = null;
        /**
         * Http error response for verifying user's answer.
         */
        this.errorVerifyAnswer = null;
        this.validation = "";
        this.audio = "";
        this.answer = "";
        this.fetchingAudioInProgress = false;
    }
    CaptchaComponent.prototype.ngOnInit = function () {
        if (!this.successMessage) {
            this.successMessage = "You can submit your application now.";
        }
    };
    CaptchaComponent.prototype.ngAfterViewInit = function () {
        this.getNewCaptcha(false);
        this.cd.detectChanges();
    };
    CaptchaComponent.prototype.answerChanged = function (event) {
        var _this = this;
        if (this.answer.length < 6) {
            this.incorrectAnswer = null;
        }
        if (this.answer.length === 6) {
            this.state = CAPTCHA_STATE.VERIFYING_ANSWER;
            this.incorrectAnswer = null;
            this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe(function (res) {
                var payload = res.json();
                if (_this.isValidPayload(payload)) {
                    _this.handleVerify(payload);
                }
                else {
                    _this.state = CAPTCHA_STATE.ERROR_VERIFY;
                    _this.errorVerifyAnswer = _this.createErrorTextLine(res);
                }
            }, function (error) {
                _this.state = CAPTCHA_STATE.ERROR_VERIFY;
                _this.errorVerifyAnswer = _this.createErrorTextLine(error);
                console.log('Error response from verifying user answer: %o', error);
            });
        }
    };
    // Call the backend to see if our answer is correct
    CaptchaComponent.prototype.handleVerify = function (payload) {
        //There could be the rare change where an invalid payload response is received.
        if (payload.valid === true) {
            this.state = CAPTCHA_STATE.SUCCESS_VERIFY_ANSWER_CORRECT;
            this.onValidToken.emit(payload.jwt);
        }
        else {
            this.incorrectAnswer = true;
            this.answer = "";
            this.audio = "";
            // They failed - try a new one.
            this.getNewCaptcha(true);
        }
    };
    /**
     * Case where HTTP 200 response code is received by the payload is incorrect or corrupt.
     * The occurance of this type of case should be rare.
     * @param payload
     */
    CaptchaComponent.prototype.isValidPayload = function (payload) {
        // console.debug('Response payload: %o', payload);
        if (!payload) {
            console.error("payload cannot be null or undefined or 0");
            return false;
        }
        else {
            var hasValueProp = payload.hasOwnProperty('valid');
            if (!hasValueProp) {
                console.error('payload must have its own property named \'valid\'');
                return false;
            }
            else {
                return true;
            }
        }
    };
    CaptchaComponent.prototype.retryFetchCaptcha = function () {
        var _this = this;
        this.state = undefined;
        /**
         * wait for 0.5 seond before resubmitting
         */
        setTimeout(function () {
            _this.getNewCaptcha(false);
        }, 100);
    };
    CaptchaComponent.prototype.playAudio = function () {
        if (this.audio && this.audio.length > 0) {
            this.audioElement.nativeElement.play();
        }
        else {
            this.fetchAudio(true);
        }
    };
    CaptchaComponent.prototype.fetchAudio = function (playImmediately) {
        var _this = this;
        if (playImmediately === void 0) { playImmediately = false; }
        if (!this.fetchingAudioInProgress) {
            this.fetchingAudioInProgress = true;
            this.dataService.fetchAudio(this.apiBaseUrl, this.validation).subscribe(function (response) {
                _this.fetchingAudioInProgress = false;
                var payload = response.json();
                _this.audio = payload.audio;
                _this.cd.detectChanges();
                if (playImmediately) {
                    _this.audioElement.nativeElement.play();
                }
            }, function (error) {
                _this.fetchingAudioInProgress = false;
                console.log('Error response from fetching audio CAPTCHA: %o', error);
                _this.cd.detectChanges();
            });
        }
    };
    CaptchaComponent.prototype.getNewCaptcha = function (errorCase) {
        var _this = this;
        this.state = CAPTCHA_STATE.FETCHING_CAPTCHA_IMG;
        this.audio = "";
        // Reset things
        if (!errorCase) {
            // Let them know they failed instead of wiping out the answer area
            // Contructing this form on page load/reload will have errorCase = false
            this.incorrectAnswer = null;
        }
        this.dataService.fetchData(this.apiBaseUrl, this.nonce).subscribe(function (response) {
            _this.state = CAPTCHA_STATE.SUCCESS_FETCH_IMG;
            var payload = response.json();
            _this.imageContainer.nativeElement.innerHTML = payload.captcha;
            _this.validation = payload.validation;
            _this.cd.detectChanges();
            if (_this.eagerFetchAudio === 'true') {
                // console.log('Fetch audio eagerly');
                _this.fetchAudio();
            }
            else {
                // console.log('Not to fetch audio eagerly');
            }
        }, function (error) {
            _this.state = CAPTCHA_STATE.ERROR_FETCH_IMG;
            _this.errorFetchingImg = _this.createErrorTextLine(error);
            console.log('Error esponse from fetching CAPTCHA text: %o', error);
            _this.cd.detectChanges();
        });
    };
    CaptchaComponent.prototype.createErrorTextLine = function (error) {
        var line = 'Error status: ' + error.status;
        if (error.statusText) {
            line = line + ', status text: ' + error.statusText;
        }
        return line;
    };
    return CaptchaComponent;
}());
__decorate([
    core_1.ViewChild('image'),
    __metadata("design:type", typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object)
], CaptchaComponent.prototype, "imageContainer", void 0);
__decorate([
    core_1.ViewChild('audioElement'),
    __metadata("design:type", typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _b || Object)
], CaptchaComponent.prototype, "audioElement", void 0);
__decorate([
    core_1.Input('apiBaseUrl'),
    __metadata("design:type", String)
], CaptchaComponent.prototype, "apiBaseUrl", void 0);
__decorate([
    core_1.Input('nonce'),
    __metadata("design:type", String)
], CaptchaComponent.prototype, "nonce", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CaptchaComponent.prototype, "onValidToken", void 0);
__decorate([
    core_1.Input('successMessage'),
    __metadata("design:type", Object)
], CaptchaComponent.prototype, "successMessage", void 0);
__decorate([
    core_1.Input('eagerFetchAudio'),
    __metadata("design:type", Object)
], CaptchaComponent.prototype, "eagerFetchAudio", void 0);
CaptchaComponent = __decorate([
    core_1.Component({
        selector: 'captcha',
        template: __webpack_require__("../../../../../src/app/captcha/captcha.component.html"),
        styles: [__webpack_require__("../../../../../src/app/captcha/captcha.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof captcha_data_service_1.CaptchaDataService !== "undefined" && captcha_data_service_1.CaptchaDataService) === "function" && _c || Object, typeof (_d = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _d || Object])
], CaptchaComponent);
exports.CaptchaComponent = CaptchaComponent;
/**
 * 7 mutually exclusive states, the program can only be in one of these state
 * at any given point..
 */
var CAPTCHA_STATE;
(function (CAPTCHA_STATE) {
    CAPTCHA_STATE[CAPTCHA_STATE["FETCHING_CAPTCHA_IMG"] = 1] = "FETCHING_CAPTCHA_IMG";
    CAPTCHA_STATE[CAPTCHA_STATE["SUCCESS_FETCH_IMG"] = 2] = "SUCCESS_FETCH_IMG";
    CAPTCHA_STATE[CAPTCHA_STATE["ERROR_FETCH_IMG"] = 3] = "ERROR_FETCH_IMG";
    CAPTCHA_STATE[CAPTCHA_STATE["VERIFYING_ANSWER"] = 4] = "VERIFYING_ANSWER";
    CAPTCHA_STATE[CAPTCHA_STATE["SUCCESS_VERIFY_ANSWER_CORRECT"] = 5] = "SUCCESS_VERIFY_ANSWER_CORRECT";
    //http error during verification call.
    CAPTCHA_STATE[CAPTCHA_STATE["ERROR_VERIFY"] = 6] = "ERROR_VERIFY";
    // SUCCESS_VERIFY_ANSWER_INCORRECT = 6,
})(CAPTCHA_STATE || (CAPTCHA_STATE = {}));
var _a, _b, _c, _d;
//# sourceMappingURL=captcha.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map