import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'increment-item',
  templateUrl: './increment-item.component.html',
  styleUrls: ['./increment-item.component.scss']
})
export class IncrementItemComponent implements OnInit {

  @Input('placeholder') placeholder;
  @Output('countChanged') countChanged = new EventEmitter();

  @ViewChild('input') input;

  count = 0;
  inputValue = '';

  constructor() { }

  ngOnInit() {}

  changeCount(change) {
    change === 'minus' ? this.count-- : this.count++;
    this.countChanged.emit({ count: this.count });
    this.inputValue = String(this.count);
  }

  changedInput(value) {
    // if the user entered a valid number
    if (!isNaN(value)) {
      this.count = parseInt(value, 10);
      this.countChanged.emit({ count: this.count });
      this.inputValue = String(this.count);
    }
  }

}
