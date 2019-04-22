import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerFeedComponent } from './trainer-feed.component';

describe('TrainerFeedComponent', () => {
  let component: TrainerFeedComponent;
  let fixture: ComponentFixture<TrainerFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
