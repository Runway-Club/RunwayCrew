import { TestBed } from '@angular/core/testing';

import { AtcGuard } from './atc.guard';

describe('AtcGuard', () => {
  let guard: AtcGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AtcGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
