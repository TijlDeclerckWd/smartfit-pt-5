import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RegisterComponent} from '../auth/register/register.component';
import {SignInComponent} from '../auth/signIn/sign-in/sign-in.component';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  innerWidth;

  dialogRef;
  signInDialogRef;

  ngUnsubscribe = new Subject();

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

    // handle when the registration is complete
    this.authService.registrationComplete
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.dialogRef.close());

    // handle when user successfully signs in
    this.authService.signInComplete
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((type) => {
      this.signInDialogRef.close();
    });
  }

  enterTraineeZone() {
    // we grab the token from the localstorage to check whether the user is logged in
    // this is flawed because trainers can enter the client zone
    // We should do some checking before they try to enter the homepage
    // when the user is a trainer, we should redirect them tp the trainer part, if he's a client, to the client section
    // When people are not logged in they should simply be able to enter this homepage
    const token = localStorage.getItem('token');
    if (token) {
    // take the user to the client zone feed
      const userId = localStorage.getItem('userId');
      this.router.navigateByUrl(`/client/${userId}/feed`);
    } else {
    //  So when there is no token, they are not logged in and we want to display a dialog to make them log in
      this.signInDialogRef = this.dialog.open(SignInComponent, {
        // dynamic width modal based on the window width
        width: this.innerWidth > 600 ? '50%' : '80%'
      });
    }
  }

  enterTrainerZone() {
    // same logic as client, perhaps we could turn this into one function with different arguments
    const token = localStorage.getItem('token');

    if (token) {
    //   take the user to the trainer zone
      const userId = localStorage.getItem('userId');
      this.router.navigateByUrl(`/trainer/${userId}/feed`);
    } else {
      this.signInDialogRef = this.dialog.open(SignInComponent, {
        // we want the width of the login dialog to be dependent on the width of the screen
        width: this.innerWidth > 600 ? '50%' : '80%'
      });
    }
  }

  // We want to register, so we open the dialog with the registercomponent inside
  openDialog(): void {
    this.dialogRef = this.dialog.open(RegisterComponent, {
      width: this.innerWidth > 600 ? '50%' : '80%'
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
