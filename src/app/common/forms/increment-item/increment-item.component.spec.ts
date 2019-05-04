import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementItemComponent } from './increment-item.component';

describe('IncrementItemComponent', () => {
  let component: IncrementItemComponent;
  let fixture: ComponentFixture<IncrementItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrementItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
