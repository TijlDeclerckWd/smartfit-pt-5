import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conversation} from '../../interfaces/conversation.interface';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'messages-conversations',
  templateUrl: './messages-conversations.component.html',
  styleUrls: ['./messages-conversations.component.scss']
})
export class MessagesConversationsComponent implements OnInit {

  @Input() conversations: Conversation[] = [];
  @Input() userId: string;

  @Output('switchConversation') switchConversation = new EventEmitter();

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  openMsgModal() {
    this.messageService.openMsgModal.next();
  }

  openConversation(conversation) {
    this.switchConversation.emit(conversation);
  }

  updateSeenMessages(conversation) {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (conversation.messages.length > conversation.seenMessages && lastMessage['sentBy'] !== this.userId) {

      this.messageService.updateSeenMessages(conversation._id)
        .subscribe((res: { updatedConversation }) => {
          const index = this.conversations.findIndex((conv) => conv._id === res.updatedConversation._id);
          this.conversations[index].seenMessages = res.updatedConversation.seenMessages;
        });
    }
  }
}
