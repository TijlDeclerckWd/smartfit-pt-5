import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {isEqualPassword} from '../../../common/validators/equal-passwords.validator';
import {countries} from '../../../common/countries';

@Component({
  selector: 'register-trainee',
  templateUrl: './register-trainee.component.html',
  styleUrls: ['./register-trainee.component.scss']
})
export class RegisterTraineeComponent implements OnInit {

  registerForm: FormGroup;
  countries = countries;

  get f() { return this.registerForm; }

  constructor() { }

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
    console.log('valid', this.registerForm.valid);
this.getFormValidationErrors();
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

}
