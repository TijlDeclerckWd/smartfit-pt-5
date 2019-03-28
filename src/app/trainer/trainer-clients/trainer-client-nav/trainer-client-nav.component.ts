import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trainer-client-nav',
  templateUrl: './trainer-client-nav.component.html',
  styleUrls: ['./trainer-client-nav.component.scss']
})
export class TrainerClientNavComponent implements OnInit {

  active1 = false;
  active2 = false;
  active3 = false;
  active4 = false;

  // Styles
  activeStyles =
    [{ 'background-color': 'gray', 'transform': 'translate(0px,125px)' },
      {'background-color': 'gray', 'transform': 'translate(60px,105px)'},
      {'background-color': 'gray', 'transform': 'translate(105px,60px)'},
      {'background-color': 'gray', 'transform': 'translate(125px,0px)'}
    ];

  inactiveStyles =
    [
      {'background-color': 'dimGray', 'transform': 'none'},
      {'background-color': 'darkGray', 'transform': 'none'},
      {'background-color': 'gray', 'transform': 'none'},
      {'background-color': 'silver', 'transform': 'none'}
    ];

  constructor() { }

  ngOnInit() {
  }

  styleObject(value, i) {
    if (this[value]) {
      return this.activeStyles[i];
    } else {
      return this.inactiveStyles[i];
    }
  }

  handleNav() {
      this.active1 = !this.active1;
      this.active2 = !this.active2;
      this.active3 = !this.active3;
      this.active4 = !this.active4;

  }

}
