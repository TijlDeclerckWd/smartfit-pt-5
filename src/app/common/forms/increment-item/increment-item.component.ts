import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'increment-item',
  templateUrl: './increment-item.component.html',
  styleUrls: ['./increment-item.component.scss']
})
export class IncrementItemComponent implements OnInit, OnChanges {

  @Input('placeholder') placeholder;
  @Input('bgc') bgc;
  @Input('color') color;
  @Input('count') count = 0;
  @Input('incrementSize') incrementSize = 1;

  @Output('countChanged') countChanged = new EventEmitter();


  @ViewChild('input') input;

  inputValue = '';

  constructor() { }

  ngOnInit() {}

  ngOnChanges(): void {
    this.inputValue = this.count.toString();
  }

  changeCount(change) {
    this.count = change === 'minus' ? this.count - this.incrementSize : this.count + this.incrementSize;
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
