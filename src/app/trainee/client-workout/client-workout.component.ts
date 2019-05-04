import { Component, OnInit } from '@angular/core';
import {WorkoutService} from '../../services/workout.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'client-workout',
  templateUrl: './client-workout.component.html',
  styleUrls: ['./client-workout.component.scss']
})
export class ClientWorkoutComponent implements OnInit {

  workoutStarted = false;

  // make front end model for this.
  workout;
  workoutId;

  exerciseCount = 0;
  exercise;

  constructor(private workoutService: WorkoutService,
              private route: ActivatedRoute,
              private router: Router,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.start();
    this.workoutId = this.route.snapshot.params.workoutId;
    this.getWorkout();
  }

  changeExercise() {
    this.exercise = this.workout.exercises[this.exerciseCount - 1];
  }

  exerciseCompleted(data) {
    this.saveExerciseData(data);

    const nextExercise = this.exerciseCount + 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        // when we completed the latest exercise, then we change the count to 100 which will lead
        // to displaying the 'workout complete' screen.
        exercise: this.exerciseCount !== this.workout.exercises.length ? String(nextExercise) : '100'
      },
      queryParamsHandling: "merge"
    });
  }

  getWorkout() {
    this.workoutService.getWorkout(this.workoutId)
      .subscribe(res => {
        this.workout = res['workout'];
        console.log('WORKOUT', this.workout);
        this.subscribeToQueryParams();
      });
  }

  saveExerciseData(data) {
    // const data = {
    //   workoutId: this.workoutId,
    //   exerciseId: data.exerciseId,
    //   reps: data.reps
    // };
  }

  startWorkout() {
    this.exerciseCount = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        exercise: String(this.exerciseCount)
      },
      queryParamsHandling: "merge"
    });
  }

  subscribeToQueryParams() {
    // subscribe to queryParams changes after the workout has completed loading
    this.route.queryParams.subscribe((queryParams) => {

      this.exerciseCount = parseInt(queryParams.exercise, 10);

      if (this.exerciseCount === 100) {
      //  the workout is complete
      //  show complete workout screen with all the data
        console.log('the workout is complete');
      } else if (this.exerciseCount > 0) {
        this.changeExercise();
      }
    });
  }
}
