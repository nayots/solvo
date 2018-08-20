import { TestBed, async, inject } from '@angular/core/testing';

import { AnnonymousGuard } from './annonymous.guard';

describe('AnnonymousGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnonymousGuard]
    });
  });

  it('should ...', inject([AnnonymousGuard], (guard: AnnonymousGuard) => {
    expect(guard).toBeTruthy();
  }));
});
