import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  BASE_API_URL = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  getProfile(trainerId) {
    return this.http.get(`${this.BASE_API_URL}/trainer/getProfile/${trainerId}`);
  }

  getAllUpdates() {
    return this.http.get(`${this.BASE_API_URL}/trainer/getAllUpdates`);
  }

  getRecentlyRegisteredTrainers() {
    return this.http.get(`${this.BASE_API_URL}/trainer/getRecentlyRegisteredTrainers`);
  }

  handleRequestResponse(data) {
    return this.http.put(`${this.BASE_API_URL}/trainer/handleRequestResponse`, data);
  }

  loadClientSchedule(clientId) {
    return this.http.get(`${this.BASE_API_URL}/trainer/loadClientSchedule/${clientId}`);
  }

  loadClientUpdates(clientId) {
    return this.http.get(`${this.BASE_API_URL}/trainer/loadClientUpdates/${clientId}`);
  }

  uploadProfilePic(formdata) {
    return this.http.post(`${this.BASE_API_URL}/trainer/uploadProfilePic`, formdata);
  }
}
