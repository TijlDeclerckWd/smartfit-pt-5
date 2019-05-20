import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChildren} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'client-exercise',
  templateUrl: './client-exercise.component.html',
  styleUrls: ['./client-exercise.component.scss']
})
export class ClientExerciseComponent implements OnChanges {

  @Input('exercise') exercise;
  @Input('exerciseData') exerciseData;

  @Output('exerciseCompleted') exerciseCompleted = new EventEmitter();

  data = [];
  inputs = [];

  amountOfSets: number;

  @ViewChildren('repInputs') repInputs;

  constructor(private sanitizer: DomSanitizer, private notifierService: NotifierService) { }

  ngOnChanges() {
    this.amountOfSets = this.exerciseData.sets;
    // make array to create this.amountOfSets # number of input elements
    this.inputs = Array(this.amountOfSets);
  }

  getDataFromInputs() {
    console.log('repInput', this.repInputs);
    this.data = this.repInputs._results.map((input) => {
      return input.nativeElement.value;
    });
  }

  checkValidityInputs() {
    // check if every input value is a valid number

    const result = this.repInputs._results.every((input) => {
      return !!input.nativeElement.value.match(/^[0-9]+$/);
    });

    return result;
  }

  completeExercise() {
    const validInputs = this.checkValidityInputs();

    // if every valid input is a valid number
    if (validInputs) {
      // ... we get all the data from the inputs
      this.getDataFromInputs();
      // ... and send it to the parent workout component
      this.exerciseCompleted.emit(this.data);
    } else {
      this.notifierService.notify('error', 'Please enter valid number values');
    }
  }

  safeUrl(link) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

}
