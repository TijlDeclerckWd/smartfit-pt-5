import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkoutService} from '../../services/workout.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NotifierService} from 'angular-notifier';
import {StatsService} from '../../services/stats.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'client-workout',
  templateUrl: './client-workout.component.html',
  styleUrls: ['./client-workout.component.scss']
})
export class ClientWorkoutComponent implements OnInit, OnDestroy {

  // make front end model for this.
  workout;
  workoutId;

  exerciseCount = 0;
  exercise;
  exerciseData = [];

  workoutComplete = false;

  clientId;

  ngUnsubscribe = new Subject();

  constructor(private workoutService: WorkoutService,
              private route: ActivatedRoute,
              private router: Router,
              private ngxService: NgxUiLoaderService,
              private notifierService: NotifierService,
              private statsService: StatsService) { }

  ngOnInit() {
    this.ngxService.start();
    this.clientId = this.route.parent.snapshot.params.userId;
    this.workoutId = this.route.snapshot.params.workoutId;
    this.getWorkout();
  }

  changeExercise() {
    this.ngxService.start();
    this.exercise = this.workout.exercises[this.exerciseCount - 1];
    this.exerciseData = this.workout.exerciseData[this.exerciseCount - 1];

    setTimeout(() => {
      this.ngxService.stop();
    }, 500);
  }

  exerciseCompleted(data) {
    this.saveExerciseData(data, this.exercise._id);

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
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.workout = res['workout'];
console.log('this.workout', this.workout);
        this.ngxService.stop();
        this.subscribeToQueryParams();
      });
  }

  saveExerciseData(data, exerciseId) {
  // save the data on the backend after each exercise
  // this will prevent chaos when the page would be reloaded
    this.statsService.saveExerciseData(this.workoutId, this.exerciseCount, exerciseId, data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        console.log('res data', res);
      }, (err) => {
        this.notifierService.notify('error', 'Something went wrong when we tried to save the exercise data');
      });
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
        this.workoutComplete = true;
        this.workoutService.completedWorkout(this.workoutId)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((res) => {
            console.log('res complete', res);
          });
      //  upload all the data and make calculations on the backend
      } else if (this.exerciseCount > 0) {
        this.changeExercise();
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
