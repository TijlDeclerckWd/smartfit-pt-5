import {Component, OnDestroy, OnInit} from '@angular/core';
import {isEqualPassword} from '../../../common/validators/equal-passwords.validator';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {NotifierService} from 'angular-notifier';
import {countries} from '../../../common/countries';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'register-trainer',
  templateUrl: './register-trainer.component.html',
  styleUrls: ['./register-trainer.component.scss']
})
export class RegisterTrainerComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  countries = countries;
  private readonly notifier: NotifierService;

  get f() {
    return this.registerForm;
  }

  ngUnsubscribe = new Subject();

  constructor(private authService: AuthService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {

    // create a register form
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password1: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('^.*(?=.{4,10})(?=.*\\d)(?=.*[a-zA-Z]).*$')]),
      password2: new FormControl(null, [
        Validators.required,
        isEqualPassword]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email]),
      country: new FormControl(null, Validators.required)
    });
  }

  checkUniqueEmail() {
    if (!this.f.get('email').hasError('email')) {
      console.log('here we check whether the email is unique');
      // this.authService.checkEmailUniqueness(this.email.value)
      //   .subscribe((data: any) => {
      //     console.log('result from unique check', data.obj);
      //     if (data.obj) {
      //       this.email.setErrors({uniqueEmail: true});
      //     } else {
      //       this.email.setErrors(null);
      //     }
      //   });
    }
  }

  onSubmit() {
// if the form is valid
    if (this.f.valid) {
      // we create an object from all the data
      const data = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password1,
        country: this.registerForm.value.country,
        type: 'trainer'
      };

      // and send it to the server where it will create a new user
      this.authService.signUp(data)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          this.notifier.notify( 'success', 'Successfully created an account!' );
          this.authService.registrationComplete.next();
        });
    } else {
      this.notifier.notify( 'error', 'There is an invalid value in your form, please correct this before submitting!' );
    }
  }

  getFormValidationErrors() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
