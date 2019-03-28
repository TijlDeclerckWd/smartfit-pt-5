import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  testIt() {
    return this.http.get('http://localhost:5000/user/test');
  }

  isLoggedIn() {
    console.log('am I logged in?');
  }
}
