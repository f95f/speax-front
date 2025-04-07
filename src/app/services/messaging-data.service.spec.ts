import { TestBed } from '@angular/core/testing';

import { MessagingDataService } from './messaging-data.service';

describe('MessagingDataService', () => {
  let service: MessagingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
