# MyGov BC CAPTCHA Widget

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.4.
It is recommended that you use the latest 1.x version of Angular CLI in your local system (globally installed).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Installing CAPTCHA into your project

First get the component via NPM:

* To install a specific version 
```
npm install git+https://github.com/bcgov/MyGovBC-CAPTCHA-Widget.git#2.1.1
```

* To install the latest version 

```
npm install git+https://github.com/bcgov/MyGovBC-CAPTCHA-Widget.git
```

Add to your AngularJS module declaration:
```
import { CaptchaComponent } from "mygovbc-captcha-widget/src/app/captcha/captcha.component";
import { CaptchaDataService } from "mygovbc-captcha-widget/src/app/captcha-data.service";


...
  declarations: [..., CaptchaComponent, ...],

  providers: [
    ..., CaptchaDataService, ...  
  ]
  

```

Then use on a template:

```
<div class="row">
    <captcha [apiBaseUrl]="captchaApiBaseUrl" 
             [nonce]="<optional string to get signed by the server>"
             (onValidToken)="authorizationToken = $event"
             successMessage="You can save the form now.">
    </captcha>
</div>
```

Set value of `successMessage` to fits with the context of your application after user solves that CAPTCHA image.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
