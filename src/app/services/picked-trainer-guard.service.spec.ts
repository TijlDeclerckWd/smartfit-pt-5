import { TestBed } from '@angular/core/testing';

import { PickedTrainerService } from './picked-trainer-guard.service';

describe('PickedTrainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickedTrainerService = TestBed.get(PickedTrainerService);
    expect(service).toBeTruthy();
  });
});
