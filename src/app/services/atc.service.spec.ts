import { TestBed } from '@angular/core/testing';

import { AtcService } from './atc.service';

describe('AtcService', () => {
  let service: AtcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
