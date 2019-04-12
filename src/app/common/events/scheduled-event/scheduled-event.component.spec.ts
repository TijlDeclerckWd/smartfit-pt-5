import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledEventComponent } from './scheduled-event.component';

describe('ScheduledEventComponent', () => {
  let component: ScheduledEventComponent;
  let fixture: ComponentFixture<ScheduledEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
