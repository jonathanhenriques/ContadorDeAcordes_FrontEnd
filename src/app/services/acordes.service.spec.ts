import { TestBed } from '@angular/core/testing';

import { AcordesService } from './acordes.service';

describe('AcordesService', () => {
  let service: AcordesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcordesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
