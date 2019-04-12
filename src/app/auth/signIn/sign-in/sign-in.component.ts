import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  loginErrorMessage = '';

  get f() {
    return this.signInForm;
  }

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required]),
      password: new FormControl( null, [
        Validators.required
      ]),
      type: new FormControl(null)
    });
  }

  onSubmit() {
    // this.getFormValidationErrors();
    this.loginErrorMessage = '';
    const data = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      type: this.signInForm.value.type
    };


    this.authService.signIn(data)
      .subscribe((res: any) => {
        // set the local storage variables
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        this.notifierService.notify( 'success', 'Successfully signed in!' );
        this.authService.signInComplete.next();
        if (data.type === 'trainer') {
          this.router.navigateByUrl(`/trainer/${res.userId}`);
        } else if (data.type === 'client') {
          console.log('client entered');
          if (res.trainerChosen) {
            console.log('trainerChosen', res.trainerChosen);
            this.router.navigateByUrl(`/client/${res.userId}`);
          } else {
            console.log('trainerNotChosen', res.trainerChosen);
            this.router.navigateByUrl(`/client/${res.userId}/pickTrainer`);
          }

        }
      }, (err) => {
        this.loginErrorMessage = 'Email / password combination was invalid';
      });
  }

  getFormValidationErrors() {
    Object.keys(this.signInForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.signInForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

}
