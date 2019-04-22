import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'pick-trainer',
  templateUrl: './pick-trainer.component.html',
  styleUrls: ['./pick-trainer.component.scss']
})
export class PickTrainerComponent implements OnInit {

  innerWidth;

  trainers = [];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log('this.innerwidth', this.innerWidth);
  }

  searchTrainer(e) {
    this.clientService.searchTrainer(e)
      .subscribe((res: any) => {
        this.trainers = res.trainers;
      });
  }

}
