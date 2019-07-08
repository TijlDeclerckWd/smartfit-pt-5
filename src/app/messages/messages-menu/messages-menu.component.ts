import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conversation} from '../../interfaces/conversation.interface';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'messages-menu',
  templateUrl: './messages-menu.component.html',
  styleUrls: ['./messages-menu.component.scss']
})
export class MessagesMenuComponent implements OnInit {

  @Input() conversations: Conversation[] = [];
  @Output() switchToMainPage = new EventEmitter();
  @Output() switchConversation = new EventEmitter();

  BASE_URL = environment.BASE_URL;
  userId;

  constructor() { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  getOtherPersonsPicture(conversation) {
    if (conversation.trainer._id == this.userId) {
      return conversation.client.profile_pic;
    } else {
      return conversation.trainer.profile_pic;
    }
  }

}
