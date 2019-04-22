import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  value = '';

  @Input('content') placeholder;
  @Output('search') sendSearchInput = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  search(e) {
    this.sendSearchInput.emit(e.target.value);
  }

}
