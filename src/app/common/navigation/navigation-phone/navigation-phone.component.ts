import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation-phone',
  templateUrl: './navigation-phone.component.html',
  styleUrls: ['./navigation-phone.component.scss']
})
export class NavigationPhoneComponent implements OnInit {

  checkboxChecked = false;

  constructor() { }

  ngOnInit() {
  }

  changeCheckboxStatus() {
    this.checkboxChecked = !this.checkboxChecked;
  }

}
