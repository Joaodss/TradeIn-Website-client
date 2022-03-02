import { TestBed } from '@angular/core/testing';

import { TradeRequestServiceService } from './trade-request-service.service';

describe('TradeRequestServiceService', () => {
  let service: TradeRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
