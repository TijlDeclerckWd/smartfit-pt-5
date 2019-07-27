import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class StatsService {

  BASE_API_URL = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  getExerciseRMData(exerciseId) {
    return this.http.get(`${this.BASE_API_URL}/stats/getExerciseRMData/${exerciseId}`);
  }

  getExerciseVolumeData(exerciseId) {
    return this.http.get(`${this.BASE_API_URL}/stats/getExerciseVolumeData/${exerciseId}`);
  }

  getTotalWorkouts() {
    return this.http.get(`${this.BASE_API_URL}/stats/getTotalWorkouts`);
  }

  getWeightStats() {
    return this.http.get(`${this.BASE_API_URL}/stats/getWeightStats`);
  }

  muscleGroupWeekData(data) {
    return this.http.post(`${this.BASE_API_URL}/stats/muscleGroupWeekData`, data);
  }

  saveExerciseData(workoutId, exerciseNumber, exerciseId, data) {
    const dataObj = { data };
    return this.http.put(`${this.BASE_API_URL}/stats/saveExerciseData/${workoutId}/${exerciseNumber}/${exerciseId}`, dataObj);
  }
}
