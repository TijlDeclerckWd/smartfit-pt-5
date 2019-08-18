import {Component, OnInit, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import {MessageService} from '../services/message.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @ViewChild('content') content;
  // @ViewChild('drop') drop;

  checkboxChecked = false;

  // this displays the list of conversations
  displayMainPage = true;

  // this displays a single conversation
  displayConversation = false;
  displayedConversation;

  userId: string;

  /*Initiating socket and related data*/
  socket;

  // conversations
  conversations = [];

  BASE_URL = environment.BASE_URL;


  // MODAL VARIABLES
  // reference to the send msg modal
  modalReference;
  // send msg form
  msgForm: FormGroup;
  // result from search for clients / trainers
  mySearchResults = [];
  // the person we're sending the message to
  to;

  totalNewMessages = 0;

  constructor(private messageService: MessageService, private ngbModal: NgbModal ) { }

  ngOnInit() {
    // get current user's ID so we can pass it on to child components
    this.userId = localStorage.getItem('userId');
    // We initiate the socket so that we can receive live updates
    this.initiateSocket();
    // we subscribe to requests from other components to open the new msg modal
    this.subModalChanges();
    // We get all the conversations of this user
    this.getConversations();
    this.socketIO();
  }

  calculateTotalNewMessages() {
    this.totalNewMessages = this.conversations.reduce((sum, curr) => {
      return sum + (curr.messages.length - curr.seenMessages);
    }, 0);
  }


  changeCheckboxStatus() {
    console.log('trigger function');
    // close / open the message overlay
    this.checkboxChecked = !this.checkboxChecked;
  }

  getConversations() {
    this.messageService.getConversations()
      .subscribe((res: { conversations }) => {
        this.conversations = res.conversations;
        this.calculateTotalNewMessages();
      });
  }

  initiateSocket() {
    // initiate the socket
    this.socket = io(environment.BASE_URL);
    //  Let user join private room (later change this to token that will be authenticated back-end)
    this.socket.emit('joinUser', { userId: this.userId });
  }

  initiateMsgForm() {
    this.msgForm = new FormGroup({
      to: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  searchUsers(value, drop) {

    this.messageService.getUserList(value)
      .subscribe((res: {myResults}) => {
        // we receive list of all the users that mactched the input
        console.log('userlist', res);
        this.mySearchResults = res.myResults;
        if (this.mySearchResults.length > 0) {
          // we display these users in the dropdown
          drop.open();
        }
      });
  }

  socketIO() {
    this.socket.on('newMsg', (data) => {
      this.updateConversation(data);

      const myMsg = data['sentBy'] === this.userId;
      // when the conversation is opened we update the seen messages automatically through the socket if it's not my message
      if (this.displayConversation && this.displayedConversation._id === data.conversation._id && !myMsg) {
        this.socket.emit('updateSeenMessages', this.displayedConversation._id);
      }
    });

    this.socket.on('updatedSeenMessages', (updatedConversation) => {
      const index = this.conversations.findIndex((conv) => conv._id === updatedConversation._id);
      this.conversations[index].seenMessages = updatedConversation._id;
      this.calculateTotalNewMessages();
    });
  }

  switchConversation(conversation) {
   console.log('switch conversation log', conversation);
   this.displayedConversation = conversation;
   this.displayConversation = true;
   this.displayMainPage = false;
  }

  subModalChanges() {
    this.messageService.openMsgModal
      .subscribe((res) => {
        this.initiateMsgForm();
        this.modalReference = this.ngbModal.open(this.content, { centered: true });
      });
  }

  submitForm() {
// we create a new message
    if (this.msgForm.valid) {
      const data = {
        // remember to send the ID of the user, not the name
        to: this.to._id,
        message: this.msgForm.value.message
      };

      this.messageService.sendMsg(data)
        .subscribe((res: { message }) => {
          console.log('AFTER SENDING MESSAGE', res);
          this.modalReference.close();
          this.socket.emit('newMessage', {userId: this.userId, message: res.message});
        });
    }
  }

  selectTrainer(e, result) {
    e.stopPropagation();
    console.log('result', result);
    // this to value represents the object of the selected trainer / client
    this.to = result;
    // we display their fullName in the input element
    this.msgForm.controls['to'].setValue(result.fullName);
  }

  switchToMainPage(e) {
    this.displayConversation = false;
    this.displayedConversation = null;
    this.displayMainPage = true;
  }

  updateConversation(data) {
    const indexConversation = this.conversations.findIndex((conversation) => conversation._id == data.conversation._id);
    if (indexConversation > -1 ) {
      this.conversations[indexConversation].messages.push(data);
    } else {
    //  we want to create a new conversation
      this.conversations.push(data.conversation);
    }
  }
}
