webpackJsonp([2,4],{

/***/ 404:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 404;


/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(215);





if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */], [__WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */]]);
//# sourceMappingURL=C:/mygovbc/MyGovBC-CAPTCHA-Widget/test/src/main.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__captcha_data_service__ = __webpack_require__(514);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaptchaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CaptchaComponent = (function () {
    function CaptchaComponent(dataService, cd) {
        this.dataService = dataService;
        this.cd = cd;
        this.onValidToken = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.userAnswerCorrect = null;
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
    }
    CaptchaComponent.prototype.ngAfterViewInit = function () {
        this.getNewCaptcha(false);
        // this.getNewCaptcha(false);
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
        console.debug('Response payload: %o', payload);
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
        }, 200);
    };
    CaptchaComponent.prototype.playAudio = function () {
        var _this = this;
        if (this.audio && this.audio.length > 0) {
            this.audioElement.nativeElement.play();
        }
        else {
            this.dataService.fetchAudio(this.apiBaseUrl, this.validation).subscribe(function (response) {
                var payload = response.json();
                _this.audio = payload.audio;
                _this.cd.detectChanges();
                _this.audioElement.nativeElement.play();
            }, function (error) {
                console.log('Error response from fetching audio CAPTCHA: %o', error);
                _this.cd.detectChanges();
            });
        }
    };
    CaptchaComponent.prototype.getNewCaptcha = function (errorCase) {
        var _this = this;
        console.log("Fetching new captcha image.");
        this.state = CAPTCHA_STATE.FETCHING_CAPTCHA_IMG;
        this.audio = "";
        // Reset things
        if (!errorCase) {
            // Let them know they failed instead of wiping out the answer area
            // Contructing this form on page load/reload will have errorCase = false
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* ViewChild */])('image'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _a) || Object)
    ], CaptchaComponent.prototype, "imageContainer", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* ViewChild */])('audioElement'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _b) || Object)
    ], CaptchaComponent.prototype, "audioElement", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])('apiBaseUrl'), 
        __metadata('design:type', String)
    ], CaptchaComponent.prototype, "apiBaseUrl", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])('nonce'), 
        __metadata('design:type', String)
    ], CaptchaComponent.prototype, "nonce", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(), 
        __metadata('design:type', Object)
    ], CaptchaComponent.prototype, "onValidToken", void 0);
    CaptchaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Component */])({
            selector: 'captcha',
            template: "\n<div>\n  <form style=\"clear:both\">\n    <div [ngClass]=\"{'has-error': !!incorrectAnswer}\">\n      <div>\n        \n        <div class=\"spinner-box\" *ngIf=\"!state || state === 1\">\n          <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\" aria-hidden=\"true\"></i>\n        </div>\n        \n        <div [ngClass]=\"{'captcha-box-visible': state === 2, 'captcha-box-invisible': state !== 2}\">\n          <div>\n            <div style=\"float: left;\" #image class=\"captcha-image\"></div>\n            <audio #audioElement *ngIf=\"audio && audio.length > 0\" id=\"audioElement\" [src]=\"audio\">\n              Your browser does not support the audio element.\n            </audio>\n            <p style=\"float: left;\">\n              <a class=\"try-another-image\" href=\"javascript:void(0)\" (click)=\"playAudio()\" role=\"button\">\n                <i class=\"fa fa-play-circle-o\" aria-hidden=\"true\" role=\"alert\"></i> Play Audio\n              </a><br>\n              <a class=\"try-another-image\" href=\"javascript:void(0)\" (click)=\"retryFetchCaptcha()\" role=\"button\">\n                <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i> Try another image\n              </a>\n            </p>\n          </div>\n          <div style=\"clear:both;\"></div>\n          <div>\n            <label for=\"answer\">Enter the text you either see in the orange box or you hear in the audio</label>\n            <div class=\"user-input\">\n              <input \n                type=\"text\"\n                class=\"form-control\"\n                id=\"answer\"\n                [(ngModel)]=\"answer\"\n                (input)=\"answerChanged($event)\"\n                name=\"answer\"\n                maxlength=\"6\"\n                required\n                autocorrect=\"off\" \n                autocapitalize=\"none\">\n            </div>\n          </div>\n        </div>\n\n        <div class=\"error-captcha\" *ngIf=\"state === 3\" role=\"alert\" aria-live=\"assertive\">\n          <i class=\"fa fa-exclamation-triangle fa-2x\" aria-hidden=\"true\"></i>\n          <span> Error happened while retreiving image. please \n            <a href=\"javascript:void(0)\" (click)=\"retryFetchCaptcha()\">click here</a> \n              to try again\n          </span>\n          <p>\n            {{errorFetchingImg}}\n          </p>\n        </div>\n        \n        <div class=\"spinner-box\" *ngIf=\"state == 4\" role=\"alert\" aria-live=\"assertive\">\n          <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n          <span>Verifying your answer...</span>\n        </div>\n        <div class=\"error-captcha\" *ngIf=\"state === 6\"  role=\"alert\" aria-live=\"assertive\">\n          <i class=\"fa fa-exclamation-triangle fa-2x\" aria-hidden=\"true\"></i>\n          <span> Error happened while verifying your answer. please \n            <a href=\"javascript:void(0)\" (click)=\"retryFetchCaptcha()\">click here</a> \n              to try again\n          </span>\n          <p>\n          </p>\n        </div>\n        \n        <div class=\"text-danger\" *ngIf=\"incorrectAnswer === true\" role=\"alert\" aria-live=\"assertive\">\n          Incorrect answer, plese try again.\n        </div>\n      </div>\n    </div>\n  </form>\n  <div class=\"confirm-correct-answer\" *ngIf=\"state === 5\" role=\"alert\" aria-live=\"assertive\">\n    <i class=\"fa fa-check success fa-2x\" aria-hidden=\"true\"></i> \n    Correct. You can submit your application now.\n  </div>\n</div>\n  \n  ",
            styles: ["\n    .confirm-correct-answer {\n      display:block;\n      \n    }\n    .confirm-correct-answer i {\n      color: green;\n    }\n    .spinner-box {\n      height: 60px;\n      margin: 6px 10px 6px 10px;\n    }\n\n    .error-captcha {\n      margin-left: 10px;\n    }\n    .error-captcha i {\n      color: darkorange;\n    }\n    .error-captcha p{\n      margin-left: 32px;\n    }\n\n    .user-input {\n      width: 300px;\n    }\n\n    .captcha-box-visible {\n      display: block\n    }\n\n    .captcha-box-invisible{\n      display: none\n    }  \n\n    .image-box {\n      position:relative\n    }\n\n    .captcha-image {\n      display: inline-block;\n      border: 1px solid darkorange;\n    }\n    .try-another-image {\n      vertical-align:text-top;\n      display: inline-block;\n      margin-left: 5px;\n    }\n\n\n  "],
            providers: [__WEBPACK_IMPORTED_MODULE_1__captcha_data_service__["a" /* DataService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__captcha_data_service__["a" /* DataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__captcha_data_service__["a" /* DataService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ChangeDetectorRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ChangeDetectorRef */]) === 'function' && _d) || Object])
    ], CaptchaComponent);
    return CaptchaComponent;
    var _a, _b, _c, _d;
}());
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
})(CAPTCHA_STATE || (CAPTCHA_STATE = {}));
//# sourceMappingURL=C:/mygovbc/MyGovBC-CAPTCHA-Widget/test/src/captcha.component.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.fetchData = function (apiBaseUrl, nonce) {
        return this.http.post(apiBaseUrl + '/captcha', { nonce: nonce }, {});
    };
    DataService.prototype.verifyCaptcha = function (apiBaseUrl, nonce, answer, encryptedAnswer) {
        return this.http.post(apiBaseUrl + '/verify/captcha', { nonce: nonce, answer: answer, validation: encryptedAnswer }, {});
    };
    DataService.prototype.fetchAudio = function (apiBaseUrl, validation) {
        return this.http.post(apiBaseUrl + '/captcha/audio', { validation: validation }, {});
    };
    DataService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], DataService);
    return DataService;
    var _a;
}());
//# sourceMappingURL=C:/mygovbc/MyGovBC-CAPTCHA-Widget/test/src/captcha.data.service.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'MyGovBC Captcha Widget Test Harness';
        this.api = "https://mygovbc-captcha-service-demo.pathfinder.gov.bc.ca";
    }
    AppComponent.prototype.validToken = function (event) {
        console.log('valid token received: %s' + event);
        this.token = event;
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(675),
            styles: [__webpack_require__(674)],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/mygovbc/MyGovBC-CAPTCHA-Widget/test/src/app.component.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_captcha_component__ = __webpack_require__(513);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__src_captcha_component__["a" /* CaptchaComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/mygovbc/MyGovBC-CAPTCHA-Widget/test/src/app.module.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/mygovbc/MyGovBC-CAPTCHA-Widget/test/src/environment.js.map

/***/ }),

/***/ 674:
/***/ (function(module, exports) {

module.exports = ".container {\r\n\r\n}"

/***/ }),

/***/ 675:
/***/ (function(module, exports) {

module.exports = "<html>\r\n\r\n<body>\r\n  <div class=\"container\">\r\n\r\n    <header>\r\n      <h1>\r\n        {{title}}\r\n\r\n      </h1>\r\n    </header>\r\n\r\n    <captcha [apiBaseUrl]=\"api\" [nonce]=\"23423234234\" (onValidToken)=\"validToken($event)\"></captcha>\r\n    <hr>\r\n    <section *ngIf=\"token\">\r\n      <h2>After solving, the captcha this token is used to send to the API: </h2>\r\n      <code>{{token}}</code><br><br>\r\n      <strong>Try decoding and verifying (requires secret) it at: <a href=\"https://jwt.io/\" target=\"_blank\">jwt.io</a></strong>\r\n    </section>\r\n  </div>\r\n</body>\r\n\r\n</html>\r\n"

/***/ }),

/***/ 956:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(405);


/***/ })

},[956]);
//# sourceMappingURL=main.bundle.map