import { TestBed } from '@angular/core/testing';

import { EditLabelService } from './edit-label.service';

describe('EditLabelService', () => {
  let service: EditLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
