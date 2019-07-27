import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {backgroundImages} from '../../li-backgrounds';

@Component({
  selector: 'workout-list-item',
  templateUrl: './workout-list-item.component.html',
  styleUrls: ['./workout-list-item.component.scss']
})
export class WorkoutListItemComponent implements OnInit {

  @Input('workout') workout;
  @Input('update') update;
  @Input('isClient') isClient = false;

  BASE_URL = environment.BASE_URL;

  collapsedExercises = true;

  clientId;

  backgroundImgs = backgroundImages;
  chosenImage: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.clientId = localStorage.getItem('userId');
    this.chosenImage = this.backgroundImgs[Math.floor(Math.random() * this.backgroundImgs.length)];
    console.log('choseImage', this.chosenImage);
  }

  determineBackground() {
    const returnedLink = `linear-gradient(to bottom right, rgba(#000,.5), rgba(#000,.5)), url("/assets/images/${this.chosenImage}")`;
    console.log('returnedLink', returnedLink);
    return returnedLink;
  }

  toggleCollapse(e) {
    e.stopPropagation();
    this.collapsedExercises = !this.collapsedExercises;
  }

  startWorkout(workoutId) {
    this.router.navigateByUrl(`/client/${this.clientId}/workout/${workoutId}`);
  }
}
