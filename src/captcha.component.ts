import {Component, ElementRef, ViewChild, Output, Input} from '@angular/core';
import { DataService } from './captcha.data.service';

@Component({
	selector: 'captcha',
	template: require('./captcha.component.html'),
	styles: [require('./captcha.component.css')],
	providers: [DataService]
})

export class CaptchaComponent {

  @Input('apiBaseUrl') apiBaseUrl:string;
  @Input('nonce') nonce:string;
  @Output('valid') captchaValid:boolean = null;
	@Output('token') jwt: string;
	validation 		= "";
	answer 				= "";

	@ViewChild('image') imageContainer: ElementRef;

	constructor(private dataService: DataService, private element: ElementRef) {
		this.getNewCaptcha(false);
	}

	// Handle form submission
	public onSubmit() {
		// Attempt to validate the user's token.
		// console.log("onsubmit", this.answer);

		this.dataService.verifyCaptcha(this.apiBaseUrl, this.nonce, this.answer, this.validation).subscribe(
			(res) => this.handleVerify(res)
			);
	}

	// Call the backend to see if our answer is correct
	private handleVerify(payload) {
		// console.log("payload response:", payload);

		if (payload.valid === true) {
			this.captchaValid = true;
			this.jwt = payload.jwt;
		} else {
			this.captchaValid = false;
			// They failed - try a new one.
			this.getNewCaptcha(true);
		}
	}

	public getNewCaptcha(errorCase) {
		console.log("getting new captcha.");
		// Reset things
		this.jwt = "";
		if (!errorCase) {
			// Let them know they failed instead of wiping out the answer area
			// Contructing this form on page load/reload will have errorCase = false
			this.captchaValid = null;
		}
		this.dataService.fetchData(this.apiBaseUrl, this.nonce).subscribe(
			(res) => this.handleCaptcha(res)
			);
	}

	// We received a payload from the server - apply it to our form.
	private handleCaptcha(payload) {
		// console.log("payload:", payload);

		this.imageContainer.nativeElement.innerHTML = payload.captcha;
		this.validation = payload.validation;
	}
}
