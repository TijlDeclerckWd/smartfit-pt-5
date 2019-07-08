import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {TrainerService} from '../../services/trainer.service';

@Component({
  selector: 'pick-trainer',
  templateUrl: './pick-trainer.component.html',
  styleUrls: ['./pick-trainer.component.scss']
})
export class PickTrainerComponent implements OnInit {

  // the width of the screen
  innerWidth;

  trainers = [];

  constructor(private clientService: ClientService, private trainerService: TrainerService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.getTrainers();
  }

  getTrainers() {
    this.trainerService.getRecentlyRegisteredTrainers()
      .subscribe((res) => {
        console.log('received trainers from backend', res);
        this.trainers = res['trainers'];
      });
  }

  searchTrainer(e) {
    // look for trainers based on the input of users
    this.clientService.searchTrainer(e)
      .subscribe((res: any) => {
        this.trainers = res.trainers;
      });
  }
}
