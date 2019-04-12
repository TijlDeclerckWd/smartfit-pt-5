import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss']
})
export class TrainerProfileComponent implements OnInit {

  selectedMenu = 'main';
  description = '';
  schedule = [];

  constructor() { }

  ngOnInit() {
  // here we load the user profile and the change the description and then assign
  }


  changeMenu(menu) {
    console.log('change menu called', menu);
    this.selectedMenu = menu;
  }

}
