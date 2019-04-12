import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerProfileMainComponent } from './trainer-profile-main.component';

describe('TrainerProfileMainComponent', () => {
  let component: TrainerProfileMainComponent;
  let fixture: ComponentFixture<TrainerProfileMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerProfileMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerProfileMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
