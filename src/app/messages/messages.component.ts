import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  checkboxChecked = false;

  displayMainPage = false;

  displayConversation = true;

  constructor() { }

  ngOnInit() {
  }


  changeCheckboxStatus() {
this.checkboxChecked = !this.checkboxChecked;
console.log('this checkboxchecked', this.checkboxChecked);
  }

  switchConversation(e) {
   console.log('switch conversation log');
  }

  switchToMainPage(e) {
    console.log('switch to main page log');
  }


}
