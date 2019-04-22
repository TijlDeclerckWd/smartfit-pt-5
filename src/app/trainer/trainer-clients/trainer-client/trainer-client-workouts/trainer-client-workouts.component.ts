import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {CreateExerciseFormComponent} from '../../../../common/forms/create-exercise-form/create-exercise-form.component';


@Component({
  selector: 'trainer-client-workouts',
  templateUrl: './trainer-client-workouts.component.html',
  styleUrls: ['./trainer-client-workouts.component.scss']
})
export class TrainerClientWorkoutsComponent implements OnInit {

  displayedSection = 'form';
  newWorkoutForm: FormGroup;
  selectedExercises = [];

  get f() {
    return this.newWorkoutForm;
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
   this.createWorkoutForm();
  }

  switchDisplayedSection() {
    this.displayedSection = this.displayedSection === 'list' ? 'form' : 'list';
  }

  addNewWorkout() {
if (this.newWorkoutForm.valid && this.selectedExercises.length > 0) {
//   add this workout to the database and make it show it up on the client his feed
}
  }

  createWorkoutForm() {
    this.newWorkoutForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'instructions': new FormControl( null)
    });
  }

  openExerciseDialog(): void {
    this.dialog.open(CreateExerciseFormComponent, {
      width: '250px'
    });
}



}
