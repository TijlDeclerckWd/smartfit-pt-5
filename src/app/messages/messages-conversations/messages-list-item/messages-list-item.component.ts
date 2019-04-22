import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'messages-list-item',
  templateUrl: './messages-list-item.component.html',
  styleUrls: ['./messages-list-item.component.scss']
})
export class MessagesListItemComponent implements OnInit {

  lastMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper id odio ut\n' +
    '      elementum. Sed at maximus ipsum. Phasellus congue nisi justo, eu varius tortor pharetra et.\n' +
    '      Curabitur eleifend suscipit metus. In hac habitasse platea dictumst.\n' +
    '      Aliquam faucibus ante mi, in auctor diam lacinia quis. Etiam iaculis sodales enim.\n' +
    '      Fusce euismod nisl posuere tempor aliquam.'

  constructor() { }

  ngOnInit() {
  }

}
