import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {CreateExerciseFormComponent} from '../../../../common/forms/create-exercise-form/create-exercise-form.component';
import {ExerciseService} from '../../../../services/exercise.service';
import {WorkoutService} from '../../../../services/workout.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
// import * as moment from 'moment';

@Component({
  selector: 'trainer-client-workouts',
  templateUrl: './trainer-client-workouts.component.html',
  styleUrls: ['./trainer-client-workouts.component.scss']
})
export class TrainerClientWorkoutsComponent implements OnInit, OnDestroy {

  displayedSection = 'form';
  newWorkoutForm: FormGroup;

  selectedExercises = [];
  exerciseData = [];
  exerciseName = '';
  exerciseSearchResults = [];

  modalReference;

  workoutSearch = '';

  selectedWorkout;

  recentWorkouts: any = [];

  clientId;
  exerciseDialogRef;

  ngUnsubscribe = new Subject();

  @ViewChild('myDrop') myDrop;
  @ViewChild('content') content;
  @ViewChild('exerciseInput') exerciseInput;

  get f() {
    return this.newWorkoutForm;
  }

  constructor(
    public dialog: MatDialog,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private router: Router
  ) { }


  ngOnInit() {
   this.createWorkoutForm();
   this.clientId = this.route.parent.snapshot.params.clientId;

   this.exerciseService.NewExerciseAdded
     .pipe(takeUntil(this.ngUnsubscribe))
     .subscribe((exercise) => {
     this.selectedExercises.push(exercise);
     this.exerciseData.push({ sets: 0, weight: 0 });
     this.exerciseDialogRef.close();
   });
   this.loadRecentWorkouts();
  }

  switchDisplayedSection() {
    this.displayedSection = this.displayedSection === 'list' ? 'form' : 'list';
  }

  addNewWorkout() {
    const pickedAllData = this.pickedAllData();

      if (this.newWorkoutForm.valid && this.selectedExercises.length > 0 && pickedAllData) {
//   add this workout to the database and make it show it up on the client his feed
      const exercises = this.selectedExercises.map((item: any) => item._id);
      const values = this.newWorkoutForm.value;

      const data = {
        name: values.name,
        date: values.date,
        instructions: values.instructions,
        exercises,
        exerciseData: this.exerciseData,
        client: this.clientId
      };

      this.workoutService.createNewWorkout(data)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          this.notifierService.notify('success', 'You successfully created a new workout');
          this.router.navigate(['../feed'], { relativeTo: this.route });
        });
    }
  }

  addToSelectedExercises(exercise) {
    this.selectedExercises.push(exercise);
    this.exerciseData.push({ sets: 0, weight: 0 });
    this.exerciseName = '';
    this.exerciseInput.nativeElement.focus();
  }

  changeExerciseData(data, index, type) {
    // index defines which exercise we'll change
    // type defines whether we update the sets or weight
    this.exerciseData[index][type] = data.count;
  }

  createWorkoutForm() {
    this.newWorkoutForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'instructions': new FormControl( null)
    });
  }

  displayWorkout(workout) {
    this.selectedWorkout = workout;
    this.modalReference = this.modalService.open(this.content);
  }

  getExerciseSearchResults() {
    if (this.exerciseName) {
      this.exerciseService.getExerciseSearchResults(this.exerciseName)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          this.exerciseSearchResults = res['exercises'];
          console.log('res', res);

          if (this.exerciseSearchResults) {
            this.myDrop.open();
          }
        }) ;
    } else {
      this.exerciseSearchResults = [];
      this.myDrop.close();
    }
  }

  loadRecentWorkouts() {
    this.workoutService.loadRecentWorkouts(this.clientId)
      .subscribe((res) => {
        this.recentWorkouts = res['workouts'];
      });
  }

  openExerciseDialog(): void {
    this.exerciseDialogRef = this.dialog.open(CreateExerciseFormComponent, {
      width: '250px'
    });
  }

  pickedAllData() {
    // here we make sure that we picked the sets and the weight for every exercise
    return this.exerciseData.every((exercise) => {
      return exercise.sets > 0 && exercise.weight > 0;
    });
  }

  removeChosenExercise(deletedExercise) {
    this.selectedExercises = this.selectedExercises.filter((chosenExercise) => deletedExercise._id !== chosenExercise._id);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
