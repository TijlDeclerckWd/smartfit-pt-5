import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RegisterComponent} from '../auth/register/register.component';
import {SignInComponent} from '../auth/signIn/sign-in/sign-in.component';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  innerWidth;

  dialogRef;
  signInDialogRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.authService.registrationComplete.subscribe(() => this.dialogRef.close());
    this.authService.signInComplete.subscribe((type) => {
      this.signInDialogRef.close();
    });
  }

  enterTraineeZone() {
    const token = localStorage.getItem('token');
    if (token) {
    // take the user to the client zone
      const userId = localStorage.getItem('userId');
      this.router.navigateByUrl(`/client/${userId}`);
    } else {
    //  show the login dialog
      this.signInDialogRef = this.dialog.open(SignInComponent, {
        width: '80%'
      });
    }
  }

  enterTrainerZone() {
    const token = localStorage.getItem('token');

    if (token) {
    //   take the user to the trainer zone
      const userId = localStorage.getItem('userId');
      this.router.navigateByUrl(`/trainer/${userId}/feed`);
    } else {
      this.signInDialogRef = this.dialog.open(SignInComponent, {
        width: this.innerWidth > 600 ? '50%' : '80%'
      });
    }
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(RegisterComponent, {
      width: this.innerWidth > 600 ? '50%' : '80%'
    });


  }

}
