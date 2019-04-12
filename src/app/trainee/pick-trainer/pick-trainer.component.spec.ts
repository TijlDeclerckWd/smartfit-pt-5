import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTrainerComponent } from './pick-trainer.component';

describe('PickTrainerComponent', () => {
  let component: PickTrainerComponent;
  let fixture: ComponentFixture<PickTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
