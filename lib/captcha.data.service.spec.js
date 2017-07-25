"use strict";
const testing_1 = require('@angular/core/testing');
const captcha_data_service_1 = require('./captcha.data.service');
describe('DataService', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [captcha_data_service_1.DataService]
        });
    });
    it('should ...', testing_1.inject([captcha_data_service_1.DataService], (service) => {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/yiling/work/MyGovBC-CAPTCHA-Widget/src/captcha.data.service.spec.js.map