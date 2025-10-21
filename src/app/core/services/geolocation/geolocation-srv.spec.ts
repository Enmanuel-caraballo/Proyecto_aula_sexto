import { TestBed } from '@angular/core/testing';

import { GeolocationSrv } from './geolocation-srv';

describe('GeolocationSrv', () => {
  let service: GeolocationSrv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationSrv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
