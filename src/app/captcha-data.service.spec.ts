import { TestBed, inject } from '@angular/core/testing';

import { CaptchaDataService } from './captcha-data.service';

describe('CaptchaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaptchaDataService]
    });
  });

  it('should be created', inject([CaptchaDataService], (service: CaptchaDataService) => {
    expect(service).toBeTruthy();
  }));
});
