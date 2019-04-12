import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTrainerMenuComponent } from './pick-trainer-menu.component';

describe('PickTrainerMenuComponent', () => {
  let component: PickTrainerMenuComponent;
  let fixture: ComponentFixture<PickTrainerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickTrainerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTrainerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
