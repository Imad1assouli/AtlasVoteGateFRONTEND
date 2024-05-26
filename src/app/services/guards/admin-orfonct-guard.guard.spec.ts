import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminORfonctGuardGuard } from './admin-orfonct-guard.guard';

describe('adminORfonctGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminORfonctGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
