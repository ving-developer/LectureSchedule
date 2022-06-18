/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TicketlotService } from './ticketlot.service';

describe('Service: Ticketlot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketlotService]
    });
  });

  it('should ...', inject([TicketlotService], (service: TicketlotService) => {
    expect(service).toBeTruthy();
  }));
});
