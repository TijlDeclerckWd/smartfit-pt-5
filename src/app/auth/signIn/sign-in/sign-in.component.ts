import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  get f() {
    return this.signInForm;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required]),
      password: new FormControl( null, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    const data = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }

    this.authService.signin()
      // HIER BEN IK GESTOPT
      .subscribe((res) => {
        console.log('RES')
      })
  }

}
