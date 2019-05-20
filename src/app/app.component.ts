import {Component, OnInit} from '@angular/core';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smartfit-PT5';

  constructor() {
    console.log(isDevMode());
  }

  ngOnInit() {}

}
