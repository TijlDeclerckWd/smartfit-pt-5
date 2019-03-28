import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClientNavComponent } from './trainer-client-nav.component';

describe('TrainerClientNavComponent', () => {
  let component: TrainerClientNavComponent;
  let fixture: ComponentFixture<TrainerClientNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerClientNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
