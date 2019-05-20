import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleGroupStatsComponent } from './muscle-group-stats.component';

describe('MuscleGroupStatsComponent', () => {
  let component: MuscleGroupStatsComponent;
  let fixture: ComponentFixture<MuscleGroupStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuscleGroupStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuscleGroupStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
