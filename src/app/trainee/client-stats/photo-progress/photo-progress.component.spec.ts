import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoProgressComponent } from './photo-progress.component';

describe('PhotoProgressComponent', () => {
  let component: PhotoProgressComponent;
  let fixture: ComponentFixture<PhotoProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
