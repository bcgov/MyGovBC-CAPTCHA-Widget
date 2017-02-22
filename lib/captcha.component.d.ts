import { ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { DataService } from './captcha.data.service';
export declare class CaptchaComponent implements AfterViewInit {
    private dataService;
    apiBaseUrl: string;
    nonce: string;
    onValidToken: EventEmitter<string>;
    captchaValid: boolean;
    private validation;
    private answer;
    imageContainer: ElementRef;
    constructor(dataService: DataService);
    ngAfterViewInit(): void;
    answerChanged(event: any): void;
    private handleVerify(payload);
    getNewCaptcha(errorCase: any): void;
    private handleCaptcha(payload);
}
