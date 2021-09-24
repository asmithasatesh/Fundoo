import { TestBed } from '@angular/core/testing';

import { LabelServiceService } from './label-service.service';

describe('LabelServiceService', () => {
  let service: LabelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
