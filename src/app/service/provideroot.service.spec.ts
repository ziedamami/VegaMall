import { TestBed } from '@angular/core/testing';

import { ProviderootService } from './provideroot.service';

describe('ProviderootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProviderootService = TestBed.get(ProviderootService);
    expect(service).toBeTruthy();
  });
});
