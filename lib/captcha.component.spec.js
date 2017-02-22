import { TestBed, async } from '@angular/core/testing';
import { CaptchaComponent } from './captcha.component';
describe('AppComponent', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [
                CaptchaComponent
            ],
        });
        TestBed.compileComponents();
    });
    it('should create the app', async(function () {
        var fixture = TestBed.createComponent(CaptchaComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it("should have as title 'app works!'", async(function () {
        var fixture = TestBed.createComponent(CaptchaComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app works!');
    }));
    it('should render title in a h1 tag', async(function () {
        var fixture = TestBed.createComponent(CaptchaComponent);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('app works!');
    }));
});
//# sourceMappingURL=c:/mygovbc/MyGovBC-CAPTCHA-Widget/src/captcha.component.spec.js.map