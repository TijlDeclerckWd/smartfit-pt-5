import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'switch-tabs',
  templateUrl: './switch-tabs.component.html',
  styleUrls: ['./switch-tabs.component.scss']
})
export class SwitchTabsComponent implements OnInit {

  @Output('changeView') changeView = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleClick(command) {
    this.changeView.emit(command);
  }

}
