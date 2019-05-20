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
    console.log('this update', this.update);
    this.clientId = localStorage.getItem('userId');
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
