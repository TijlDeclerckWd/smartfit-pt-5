import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFeedComponent } from './client-feed.component';

describe('ClientFeedComponent', () => {
  let component: ClientFeedComponent;
  let fixture: ComponentFixture<ClientFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
