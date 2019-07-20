import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'exercise-list-item',
  templateUrl: './exercise-list-item.component.html',
  styleUrls: ['./exercise-list-item.component.scss']
})
export class ExerciseListItemComponent implements OnInit {

  @Input('exercise') exercise;

  BASE_URL = environment.BASE_URL;

  constructor() { }

  ngOnInit() {
    console.log('exercise', this.exercise);
  }

}
