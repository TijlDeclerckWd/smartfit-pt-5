import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRMStatsComponent } from './one-rm-stats.component';

describe('OneRMStatsComponent', () => {
  let component: OneRMStatsComponent;
  let fixture: ComponentFixture<OneRMStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneRMStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneRMStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
