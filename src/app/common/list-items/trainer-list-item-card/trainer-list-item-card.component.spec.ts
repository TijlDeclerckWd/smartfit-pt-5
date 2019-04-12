import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerListItemCardComponent } from './trainer-list-item-card.component';

describe('TrainerListItemCardComponent', () => {
  let component: TrainerListItemCardComponent;
  let fixture: ComponentFixture<TrainerListItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerListItemCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerListItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
