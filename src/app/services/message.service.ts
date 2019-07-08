import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  BASE_API_URL = environment.BASE_API_URL;
  openMsgModal = new Subject();

  constructor(private http: HttpClient) { }

  getConversations() {
    return this.http.get(`${this.BASE_API_URL}/messages/getConversations`);
  }

  getUserList(value) {
    return this.http.get(`${this.BASE_API_URL}/messages/getUserList/${value}`);
  }

  sendMsg(data) {
    return this.http.post(`${this.BASE_API_URL}/messages/sendMsg`, data);
  }

  updateSeenMessages(conversation) {
    const data = {
      conversation
    };
    return this.http.put(`${this.BASE_API_URL}/messages/updateSeenMessages`, data);
  }
}
