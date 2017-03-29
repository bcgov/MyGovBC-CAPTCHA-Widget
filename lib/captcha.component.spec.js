"use strict";
var testing_1 = require("@angular/core/testing");
var captcha_component_1 = require("./captcha.component");
describe('AppComponent', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                captcha_component_1.CaptchaComponent
            ],
        });
        testing_1.TestBed.compileComponents();
    });
    it('should create the app', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(captcha_component_1.CaptchaComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it("should have as title 'app works!'", testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(captcha_component_1.CaptchaComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app works!');
    }));
    it('should render title in a h1 tag', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(captcha_component_1.CaptchaComponent);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('app works!');
    }));
});
//# sourceMappingURL=/Users/yiling/work/MyGovBC-CAPTCHA-Widget/src/captcha.component.spec.js.map