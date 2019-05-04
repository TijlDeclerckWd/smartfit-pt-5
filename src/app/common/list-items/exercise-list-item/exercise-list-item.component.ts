import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'exercise-list-item',
  templateUrl: './exercise-list-item.component.html',
  styleUrls: ['./exercise-list-item.component.scss']
})
export class ExerciseListItemComponent implements OnInit {

  @Input('exercise') exercise;

  constructor() { }

  ngOnInit() {
    console.log('exercise', this.exercise);
  }

}
