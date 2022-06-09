import { TestBed } from '@angular/core/testing';

import { CompanyOwnerGuard } from './company-owner.guard';

describe('CompanyOwnerGuard', () => {
  let guard: CompanyOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompanyOwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
