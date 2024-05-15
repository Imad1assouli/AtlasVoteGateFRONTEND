import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { fonctionnaireGuard } from './fonctionnaire.guard';

describe('fonctionnaireGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => fonctionnaireGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
