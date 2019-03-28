import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-trainer-client',
  templateUrl: './trainer-client.component.html',
  styleUrls: ['./trainer-client.component.scss']
})
export class TrainerClientComponent implements OnInit {

  @ViewChild('cnButton') cnButton;
  @ViewChild('cnOverlay') cnOverlay;
  @ViewChild('cnWrapper') cnWrapper;

  navOpened = false;

  constructor() { }

  ngOnInit() {}

  cnHandler(e) {
    e.stopPropagation();
  }

  handler(e) {
    if (!e) {
      e = window.event;
    }
    this.navOpened ? this.closeNav() : this.openNav();
  }

  openNav() {
    this.navOpened = true;
    console.log('cnButton', this.cnOverlay);
    this.cnButton.innerHTML = "-";
    this.cnOverlay.nativeElement.classList.add("on-overlay");
    this.cnWrapper.nativeElement.classList.add("opened-nav");
  }

  closeNav() {
    this.navOpened = false;
    this.cnButton.innerHTML = "+";
    this.cnOverlay.nativeElement.classList.remove("on-overlay");
    this.cnWrapper.nativeElement.classList.remove("opened-nav");
  }
}
