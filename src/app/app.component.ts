import {Component, OnInit} from '@angular/core';
import { isDevMode } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smartfit-PT5';
  router: string;

  constructor(private _router: Router) {
    this.router = _router.url;
  }

  ngOnInit() {}

}
