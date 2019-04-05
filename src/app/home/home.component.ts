import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {RegisterComponent} from '../auth/register/register.component';
import {SignInComponent} from '../auth/signIn/sign-in/sign-in.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dialogRef;
  loginDialogRef;


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  enterTraineeZone() {
    const token = localStorage.getItem('token');

    if (token) {
    // take the user to the trainee zone
    } else {
    //  show the login dialog
      this.loginDialogRef = this.dialog.open(SignInComponent, {
        width: '80%'
      })
    }
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(RegisterComponent, {
      width: '80%'
    });
  }

}
