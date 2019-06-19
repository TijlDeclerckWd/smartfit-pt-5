import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'workout-list-item',
  templateUrl: './workout-list-item.component.html',
  styleUrls: ['./workout-list-item.component.scss']
})
export class WorkoutListItemComponent implements OnInit {

  @Input('workout') workout;
  @Input('update') update;
  @Input('isClient') isClient = false;

  collapsedExercises = true;

  clientId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.clientId = localStorage.getItem('userId');
    console.log('do we have a workout', this.workout);
  }

  toggleCollapse(e) {
    e.stopPropagation();
    this.collapsedExercises = !this.collapsedExercises;
  }

  toggleCheckbox(e) {
    e.stopPropagation();
  }

  startWorkout(workoutId) {
    this.router.navigateByUrl(`/client/${this.clientId}/workout/${workoutId}`);
  }
}
