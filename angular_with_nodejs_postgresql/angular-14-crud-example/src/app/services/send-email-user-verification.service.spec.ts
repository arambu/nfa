import { TestBed } from '@angular/core/testing';

import { SendEmailUserVerificationService } from './send-email-user-verification.service';

describe('SendEmailUserVerificationService', () => {
  let service: SendEmailUserVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendEmailUserVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
