import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {WorkoutService} from '../../services/workout.service';
import * as moment from 'moment';

@Component({
  selector: 'app-client-schedule',
  templateUrl: './client-schedule.component.html',
  styleUrls: ['./client-schedule.component.scss']
})

export class ClientScheduleComponent implements OnInit {

  scheduledWorkouts = [];

  currentSetDate;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.loadClientSchedule();
  }

  loadClientSchedule() {
    this.workoutService.loadClientSchedule()
      .subscribe((res) => {
        console.log('SCHEDULE', res);
        this.scheduledWorkouts = res['workouts'];
      });
  }

  determineDate(workout) {
    if (this.currentSetDate === workout.date) {
      return 'hidden';
    } else {
      this.currentSetDate = workout.date;
      return 'visible';
    }
  }

  getDay(date) {
return moment(date).format('D');
  }

  getMonth(date) {
    return moment(date).format('MMM')
  }

}
