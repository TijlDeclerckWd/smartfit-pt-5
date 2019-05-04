import {Component, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'client-exercise',
  templateUrl: './client-exercise.component.html',
  styleUrls: ['./client-exercise.component.scss']
})
export class ClientExerciseComponent implements OnInit {

  @Input('exercise') exercise;
  @Input('exerciseData') exerciseData;

  @Output('exerciseCompleted') exerciseCompleted = new EventEmitter();

  data = [];
  inputs = [];

  amountOfSets: number;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.amountOfSets = this.exerciseData.sets;
    // make array to create this.amountOfSets number of input elements
    this.inputs = Array(this.amountOfSets);
  }

  completeExercise() {
    this.exerciseCompleted.emit(this.data);
  }

  safeUrl(link) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

}
