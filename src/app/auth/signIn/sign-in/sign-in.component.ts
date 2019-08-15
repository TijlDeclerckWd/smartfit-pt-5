import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  ngUnsubscribe = new Subject();

  // this message will display when there was an issue logging in at the server
  loginErrorMessage = '';

  chosenButton: string;

  get f() {
    return this.signInForm;
  }

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // chosen button trainer || client
    console.log('TEST', this.data.type);
    this.chosenButton = this.data.type;
    // create the sign in form
    this.signInForm = new FormGroup({
      email: new FormControl(null, [
        // we should check for async unique email validator, try to read docs on the third argument of this formControl
        Validators.email,
        Validators.required]),
      password: new FormControl( null, [
        Validators.required
      ]),
      // type to differentiate between trainers and clients
      type: new FormControl(this.chosenButton)
    });
  }

  onSubmit() {
    // we should add logic to avoid double submits
    // also check if the form is valid before we make the server request

    // reset the login error message
    this.loginErrorMessage = '';
    const data = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      type: this.signInForm.value.type
    };

    this.authService.signIn(data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        // set the local storage variables
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);

        this.notifierService.notify( 'success', 'Successfully signed in!' );

        // we call this subject so we can close the sign in dialog
        this.authService.signInComplete.next();

        // we navigate to the right section of the app by differentiating between trainers and clients
        if (data.type === 'trainer') {
          this.router.navigateByUrl(`/trainer/${res.userId}/feed`);
        } else if (data.type === 'client') {
          // we look whether this person has already chosen a trainer
          if (res.trainerChosen) {
            // if he has, we navigate to his feed page
            this.router.navigateByUrl(`/client/${res.userId}/feed`);
          } else {
            // if he hasn't then navigate to the page where he can find his own PT
            this.router.navigateByUrl(`/client/${res.userId}/pickTrainer`);
          }
        }
      }, (err) => {
        // the error message we will display in the mat-error when there were server issues
        // we need to further differentiate between the different types of errors.
        this.loginErrorMessage = 'Email / password combination was invalid';
      });
  }

  ngOnDestroy(): void {
this.ngUnsubscribe.next();
this.ngUnsubscribe.complete();
  }
}
