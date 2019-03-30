import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {RegisterComponent} from '../auth/register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dialogRef;


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(RegisterComponent, {
      width: '80%'
    });
  }

}
