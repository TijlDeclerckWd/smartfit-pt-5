import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseVolumeStatsComponent } from './exercise-volume-stats.component';

describe('ExerciseVolumeStatsComponent', () => {
  let component: ExerciseVolumeStatsComponent;
  let fixture: ComponentFixture<ExerciseVolumeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseVolumeStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseVolumeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
