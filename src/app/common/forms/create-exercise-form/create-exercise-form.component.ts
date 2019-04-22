import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-exercise-form',
  templateUrl: './create-exercise-form.component.html',
  styleUrls: ['./create-exercise-form.component.scss']
})
export class CreateExerciseFormComponent implements OnInit {

  createExerciseForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.createExerciseForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'image': new FormControl(null),
      'targetMuscles': new FormControl(null),
      'instructions': new FormControl(null),
      'videoLink': new FormControl(null)
    });
  }

  createExercise() {

  }

}
