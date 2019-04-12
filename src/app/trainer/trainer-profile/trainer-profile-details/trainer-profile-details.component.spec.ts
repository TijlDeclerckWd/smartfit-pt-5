import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerProfileDetailsComponent } from './trainer-profile-details.component';

describe('TrainerProfileDetailsComponent', () => {
  let component: TrainerProfileDetailsComponent;
  let fixture: ComponentFixture<TrainerProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
