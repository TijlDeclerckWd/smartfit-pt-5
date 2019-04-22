import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerFeedClientsComponent } from './trainer-feed-clients.component';

describe('TrainerFeedClientsComponent', () => {
  let component: TrainerFeedClientsComponent;
  let fixture: ComponentFixture<TrainerFeedClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerFeedClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerFeedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
