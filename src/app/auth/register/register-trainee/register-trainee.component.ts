import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {isEqualPassword} from '../../../common/validators/equal-passwords.validator';
import {countries} from '../../../common/countries';
import {AuthService} from '../../../services/auth.service';
import {SnotifyService} from 'ng-snotify';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'register-trainee',
  templateUrl: './register-trainee.component.html',
  styleUrls: ['./register-trainee.component.scss']
})
export class RegisterTraineeComponent implements OnInit {

  registerForm: FormGroup;
  countries = countries;
  private readonly notifier: NotifierService;

  get f() {
    return this.registerForm;
  }

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

  // not priority, but definitely needs to be added before launch
  checkUniqueEmail() {
    if (!this.f.get('email').hasError('email')) {
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
        type: 'client'
      };

      // and send it to the server where it will create a new user
      this.authService.signUp(data)
        .subscribe((res) => {
          this.notifier.notify( 'success', 'Successfully created an account!' );
          // to close the dialog
          this.authService.registrationComplete.next();
        });
    } else {
      this.notifier.notify( 'error', 'There is an invalid value in your form, please correct this before submitting!' );
    }
  }
}
