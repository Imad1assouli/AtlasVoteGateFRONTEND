import { TestBed } from '@angular/core/testing';

import { ElectoralPartyService } from './electoralparty.service';

describe('ElectoralPartiesService', () => {
  let service: ElectoralPartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectoralPartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
