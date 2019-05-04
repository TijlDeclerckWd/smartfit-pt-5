import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {CreateExerciseFormComponent} from '../../../../common/forms/create-exercise-form/create-exercise-form.component';
import {ExerciseService} from '../../../../services/exercise.service';
import {WorkoutService} from '../../../../services/workout.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'trainer-client-workouts',
  templateUrl: './trainer-client-workouts.component.html',
  styleUrls: ['./trainer-client-workouts.component.scss']
})
export class TrainerClientWorkoutsComponent implements OnInit {

  displayedSection = 'form';
  newWorkoutForm: FormGroup;

  selectedExercises = [];
  exerciseData = [];

  workoutSearch = '';

  recentWorkouts: any = [];

  clientId;
  exerciseDialogRef;

  get f() {
    return this.newWorkoutForm;
  }

  constructor(
    public dialog: MatDialog,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private route: ActivatedRoute) { }


  ngOnInit() {
   this.createWorkoutForm();
   this.clientId = this.route.parent.snapshot.params.clientId;

   this.exerciseService.NewExerciseAdded.subscribe((exercise) => {
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
    console.log('valid', this.newWorkoutForm.valid);
    console.log('selected', this.selectedExercises.length > 0);
    console.log('pickedAllData', pickedAllData);
    if (this.newWorkoutForm.valid && this.selectedExercises.length > 0 && pickedAllData) {
//   add this workout to the database and make it show it up on the client his feed
      const exercises = this.selectedExercises.map((item: any) => item._id);
      const values = this.newWorkoutForm.value;
      const date = new Date(values.date.year, values.date.month, values.date.day);
      const data = {
        name: values.name,
        type: values.type,
        date,
        instructions: values.instructions,
        exercises,
        exerciseData: this.exerciseData,
        client: this.clientId
      };

      this.workoutService.createNewWorkout(data)
        .subscribe((res) => {
          console.log('Res', res);
        });
    }
  }

  changeExerciseData(data, index, type) {
    // index defines which exercise we'll change
    // type defines whether we update the sets or weight
    this.exerciseData[index][type] = data.count;
    console.log('exercisedata', this.exerciseData[index][type]);
  }

  createWorkoutForm() {
    this.newWorkoutForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'instructions': new FormControl( null)
    });
  }

  loadRecentWorkouts() {
    this.workoutService.loadRecentWorkouts(this.clientId)
      .subscribe((res) => {
        this.recentWorkouts = res['workouts'];
      });
  }

  pickedAllData() {
    // here we make sure that we picked the sets and the weight for every exercise
    return this.exerciseData.every((exercise) => {
      console.log('exercise', exercise);
      return exercise.sets > 0 && exercise.weight > 0;
    });
  }


  openExerciseDialog(): void {
    this.exerciseDialogRef = this.dialog.open(CreateExerciseFormComponent, {
      width: '250px'
    });
}



}
