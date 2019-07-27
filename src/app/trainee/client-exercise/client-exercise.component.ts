import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChildren} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'client-exercise',
  templateUrl: './client-exercise.component.html',
  styleUrls: ['./client-exercise.component.scss']
})
export class ClientExerciseComponent implements OnChanges, OnInit {

  @Input('exercise') exercise;
  @Input('exerciseData') exerciseData;

  @Output('exerciseCompleted') exerciseCompleted = new EventEmitter();

  data = [];
  inputs = [];

  amountOfSets: number;

  numbers = [];

  @ViewChildren('repInputs') repInputs;

  constructor(private sanitizer: DomSanitizer, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.setNumbers();
  }

  ngOnChanges() {
    this.amountOfSets = this.exerciseData.sets;
    // make array to create this.amountOfSets # number of input elements
    this.inputs = Array(this.amountOfSets);
  }

  getDataFromInputs() {
    this.data = this.repInputs._results.map((input) => input._value);
  }

  checkValidityInputs() {
    // check if every input value is a valid number
    return this.repInputs._results.every((input) => typeof input._value === 'number');
  }

  completeExercise() {
    const validInputs = this.checkValidityInputs();

    // if every valid input is a valid number
    if (validInputs) {
      // ... we get all the data from the inputs
      this.getDataFromInputs();
      // ... and send it to the parent workout component
      this.exerciseCompleted.emit(this.data);
      // Quick way to reset the values when switching to new exercise.
      this.numbers = [];
      this.setNumbers();
    } else {
      this.notifierService.notify('error', 'Please enter valid number values');
    }
  }

  safeUrl(link) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  setNumbers() {
    return new Promise(() => {
      for (let i = 1; i < 31; i++) {
        this.numbers.push(i);
      }
    });
  }

}
