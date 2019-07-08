import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'messages-conversation',
  templateUrl: './messages-conversation.component.html',
  styleUrls: ['./messages-conversation.component.scss']
})
export class MessagesConversationComponent implements OnInit {

  @Input('conversation') conversation;
  @Input('userId') userId;
  @Input('socket') socket;

  otherUser;

  message = '';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.determineOtherUser();
  }

  determineMargin(message) {
    // message sentBy is either 'client' or trainer, which are also properties on the conversation object
    // this way we can see whether this is our message or form otherUser

    // so this message is sent by the other user? if so we return 0, if it isn't we return 'auto'
    return message[message.sentBy]._id == this.otherUser._id ? 0 : 'auto';
  }

  determineOtherUser() {
    this.otherUser = this.conversation.trainer._id == this.userId ?
      this.conversation.client
      : this.conversation.trainer;
  }

  sendMsg() {
    console.log('starting process', this.message);
    if (this.message) {
      const data = {
        to: this.otherUser._id,
        message: this.message
      };

      this.messageService.sendMsg(data)
        .subscribe((res: { message }) => {
          console.log('res', res);
          this.socket.emit('newMessage', {userId: this.userId, message: res.message});
        });
    }
  }

}
