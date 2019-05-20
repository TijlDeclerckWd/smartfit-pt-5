import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutUpdateComponent } from './workout-update.component';

describe('WorkoutUpdateComponent', () => {
  let component: WorkoutUpdateComponent;
  let fixture: ComponentFixture<WorkoutUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
