import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pick-trainer',
  templateUrl: './pick-trainer.component.html',
  styleUrls: ['./pick-trainer.component.scss']
})
export class PickTrainerComponent implements OnInit {

  innerWidth;

  trainers = [
    {name: 'jos', location: 'weetwel'}
  ];

  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log('this.innerwidth', this.innerWidth);
  }

}
