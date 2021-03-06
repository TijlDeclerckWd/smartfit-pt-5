import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPhoneComponent } from './navigation-phone.component';

describe('NavigationPhoneComponent', () => {
  let component: NavigationPhoneComponent;
  let fixture: ComponentFixture<NavigationPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
