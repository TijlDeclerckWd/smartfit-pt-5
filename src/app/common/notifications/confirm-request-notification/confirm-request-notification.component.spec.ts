import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRequestNotificationComponent } from './confirm-request-notification.component';

describe('ConfirmRequestNotificationComponent', () => {
  let component: ConfirmRequestNotificationComponent;
  let fixture: ComponentFixture<ConfirmRequestNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRequestNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRequestNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
