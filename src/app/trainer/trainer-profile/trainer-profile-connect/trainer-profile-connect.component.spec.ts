import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerProfileConnectComponent } from './trainer-profile-connect.component';

describe('TrainerProfileConnectComponent', () => {
  let component: TrainerProfileConnectComponent;
  let fixture: ComponentFixture<TrainerProfileConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerProfileConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerProfileConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
