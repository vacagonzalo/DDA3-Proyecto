import { TestBed } from '@angular/core/testing';

import { OrdersMqttService } from './orders-mqtt.service';

describe('OrdersMqttService', () => {
  let service: OrdersMqttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersMqttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
