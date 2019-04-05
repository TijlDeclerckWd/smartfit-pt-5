import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_API_URL = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem('token');
  }

  signUp(data) {
    return this.http.post(`${this.BASE_API_URL}/auth/signUp`, data);
  }

  isLoggedIn() {
    console.log('am I logged in?');
  }


}
