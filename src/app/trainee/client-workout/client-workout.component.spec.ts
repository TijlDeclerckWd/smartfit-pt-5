import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWorkoutComponent } from './client-workout.component';

describe('ClientWorkoutComponent', () => {
  let component: ClientWorkoutComponent;
  let fixture: ComponentFixture<ClientWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
