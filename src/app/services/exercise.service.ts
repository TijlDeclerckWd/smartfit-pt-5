import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  BASE_API_URL = environment.BASE_API_URL;

  NewExerciseAdded = new Subject();

  constructor(private http: HttpClient) { }

  createNewExercise(formData) {
    return this.http.post(`${this.BASE_API_URL}/exercise/createNewExercise`, formData);
  }

  getClientExercises() {
    return this.http.get(`${this.BASE_API_URL}/exercise/getClientExercises`);
  }

  getExerciseSearchResults(exerciseName) {
    return this.http.get(`${this.BASE_API_URL}/exercise/getExerciseSearchResults/${exerciseName}`);
  }
}
