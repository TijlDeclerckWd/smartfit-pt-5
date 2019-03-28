import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClientComponent } from './trainer-client.component';

describe('TrainerClientComponent', () => {
  let component: TrainerClientComponent;
  let fixture: ComponentFixture<TrainerClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
