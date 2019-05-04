import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'pick-trainer',
  templateUrl: './pick-trainer.component.html',
  styleUrls: ['./pick-trainer.component.scss']
})
export class PickTrainerComponent implements OnInit {

  // the width of the screen
  innerWidth;

  trainers = [];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  searchTrainer(e) {
    // look for trainers based on the input of users
    this.clientService.searchTrainer(e)
      .subscribe((res: any) => {
        this.trainers = res.trainers;
      });
  }
}
