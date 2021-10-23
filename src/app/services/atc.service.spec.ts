import { TestBed } from '@angular/core/testing';

import { ATCService } from './atc.service';

describe('AtcService', () => {
  let service: ATCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
