import { TestBed } from '@angular/core/testing';

import { GlobalItems } from './global-items';

describe('GlobalItems', () => {
  let service: GlobalItems;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalItems);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
