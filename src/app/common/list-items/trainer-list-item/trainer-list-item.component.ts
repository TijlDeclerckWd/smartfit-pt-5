import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trainer-list-item',
  templateUrl: './trainer-list-item.component.html',
  styleUrls: ['./trainer-list-item.component.scss']
})
export class TrainerListItemComponent implements OnInit {

  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper id odio ut\n' +
    '      elementum. Sed at maximus ipsum. Phasellus congue nisi justo, eu varius tortor pharetra et.\n' +
    '      Curabitur eleifend suscipit metus. In hac habitasse platea dictumst.\n' +
    '      Aliquam faucibus ante mi, in auctor diam lacinia quis. Etiam iaculis sodales enim.\n' +
    '      Fusce euismod nisl posuere tempor aliquam.'

  constructor() { }

  ngOnInit() {
    console.log('started the list component');
  }



}
