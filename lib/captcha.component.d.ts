import { ElementRef } from '@angular/core';
import { DataService } from './captcha.data.service';
export declare class CatpchaComponent {
    private dataService;
    private element;
    apiBaseUrl: string;
    nonce: string;
    captchaValid: boolean;
    jwt: string;
    validation: string;
    answer: string;
    imageContainer: ElementRef;
    constructor(dataService: DataService, element: ElementRef);
    onSubmit(): void;
    private handleVerify(payload);
    getNewCaptcha(errorCase: any): void;
    private handleCaptcha(payload);
}
