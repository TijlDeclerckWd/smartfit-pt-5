import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClientFeedComponent } from './trainer-client-feed.component';

describe('TrainerClientFeedComponent', () => {
  let component: TrainerClientFeedComponent;
  let fixture: ComponentFixture<TrainerClientFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerClientFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
