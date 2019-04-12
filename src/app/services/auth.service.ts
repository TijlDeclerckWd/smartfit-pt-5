import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_API_URL = environment.BASE_API_URL;
  registrationComplete = new Subject();
  signInComplete = new Subject();

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem('token');
  }

  signIn(data) {
    return this.http.post(`${this.BASE_API_URL}/auth/signIn`, data);
  }

  signUp(data) {
    return this.http.post(`${this.BASE_API_URL}/auth/signUp`, data);
  }

  isLoggedIn() {
    return true;
  }


}
