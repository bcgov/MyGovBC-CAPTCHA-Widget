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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.fetchData = function (apiBaseUrl, nonce) {
        return this.http.post(apiBaseUrl + '/captcha', { nonce: nonce }, {})
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.verifyCaptcha = function (apiBaseUrl, nonce, answer, encryptedAnswer) {
        return this.http.post(apiBaseUrl + '/verify/captcha', { nonce: nonce, answer: answer, validation: encryptedAnswer }, {})
            .map(function (res) { return res.json(); });
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=c:/mygovbc/MyGovBC-CAPTCHA-Widget/src/captcha.data.service.js.map