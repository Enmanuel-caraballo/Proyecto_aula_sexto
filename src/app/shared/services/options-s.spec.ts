import { TestBed } from '@angular/core/testing';

import { OptionsS } from './options-s';

describe('OptionsS', () => {
  let service: OptionsS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionsS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
