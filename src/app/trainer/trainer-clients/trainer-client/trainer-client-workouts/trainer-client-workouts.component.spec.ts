import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClientWorkoutsComponent } from './trainer-client-workouts.component';

describe('TrainerClientWorkoutsComponent', () => {
  let component: TrainerClientWorkoutsComponent;
  let fixture: ComponentFixture<TrainerClientWorkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerClientWorkoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
