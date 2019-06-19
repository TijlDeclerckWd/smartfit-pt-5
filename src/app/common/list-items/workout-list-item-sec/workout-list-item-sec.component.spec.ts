import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutListItemSecComponent } from './workout-list-item-sec.component';

describe('WorkoutListItemSecComponent', () => {
  let component: WorkoutListItemSecComponent;
  let fixture: ComponentFixture<WorkoutListItemSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutListItemSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListItemSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
