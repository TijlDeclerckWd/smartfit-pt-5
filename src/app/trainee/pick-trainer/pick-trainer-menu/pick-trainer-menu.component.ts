import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pick-trainer-menu',
  templateUrl: './pick-trainer-menu.component.html',
  styleUrls: ['./pick-trainer-menu.component.scss']
})
export class PickTrainerMenuComponent implements OnInit {

  selected = 'close to you';

  constructor() { }

  ngOnInit() {
  }

  switchMenu(menu) {
    this.selected = menu;
  }

}
