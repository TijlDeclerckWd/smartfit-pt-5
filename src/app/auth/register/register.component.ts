import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  type;

  constructor() { }

  ngOnInit() {
  }

  setTypeAccount(type) {
    this.type = type;
  }
}
