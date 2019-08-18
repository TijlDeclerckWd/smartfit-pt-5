import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'messages-list-item',
  templateUrl: './messages-list-item.component.html',
  styleUrls: ['./messages-list-item.component.scss']
})
export class MessagesListItemComponent implements OnInit{

  @Input() userId;
  @Input() conversation;
  @Input() lastMessage;

  BASE_URL = environment.BASE_URL;

  otherUser;

  constructor() { }

  ngOnInit() {
    this.defineOtherUser();
  }


  defineOtherUser() {
    // if the id of the current user is the same as the one of the trainer in the conversation
    this.otherUser = this.userId == this.conversation.trainer._id ?
      // ... then the otherUser equals the client
      this.conversation.client
      // ... if not it equals the trainer
      : this.conversation.trainer;
  }

  thereAreNewMessages() {
    // there are new messages in this conversation
    const lastMessage = this.conversation.messages[this.conversation.messages.length - 1];

//    Are there new messages in this conversation?
if (this.conversation.seenMessages === this.conversation.messages.length) {
  return false;
} else {
  // if I am the person who sent the last msg in this conversation we return false
  return lastMessage[lastMessage.sentBy] !== this.userId;
}
  }
}
