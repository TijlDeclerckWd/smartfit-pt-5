import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class WorkoutService {

  BASE_API_URL = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  createNewWorkout(data) {
    return this.http.post(`${this.BASE_API_URL}/workout/createNewWorkout`, data);
  }

  completedWorkout(workoutId) {
    return this.http.get(`${this.BASE_API_URL}/workout/completedWorkout/${workoutId}`);
  }

  getWorkout(workoutId) {
    return this.http.get(`${this.BASE_API_URL}/workout/getWorkout/${workoutId}`);
  }

  loadRecentWorkouts(clientId) {
    return this.http.get(`${this.BASE_API_URL}/workout/loadRecentWorkouts/${clientId}`);
  }

  loadClientSchedule() {
    return this.http.get(`${this.BASE_API_URL}/workout/loadClientSchedule`);
  }
}
