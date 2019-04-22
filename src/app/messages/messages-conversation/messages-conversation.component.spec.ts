import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesConversationComponent } from './messages-conversation.component';

describe('MessagesConversationComponent', () => {
  let component: MessagesConversationComponent;
  let fixture: ComponentFixture<MessagesConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
