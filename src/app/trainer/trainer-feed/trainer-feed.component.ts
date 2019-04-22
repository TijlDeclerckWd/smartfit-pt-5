import { Component, OnInit } from '@angular/core';
import {TrainerService} from '../../services/trainer.service';

@Component({
  selector: 'app-trainer-feed',
  templateUrl: './trainer-feed.component.html',
  styleUrls: ['./trainer-feed.component.scss']
})
export class TrainerFeedComponent implements OnInit {

  updates = [];
  clients = [];

  constructor(private trainerService: TrainerService) { }

  ngOnInit() {
    this.getAllUpdates();
  }

  getAllUpdates() {
    this.trainerService.getAllUpdates()
      .subscribe((res: any) => {
        this.updates = res.trainer.updates;
        this.clients = res.trainer.clients;
        console.log('clients', this.clients);
      });
  }

  handleRequestResponse(response) {
    this.trainerService.handleRequestResponse(response)
      .subscribe((res) => {
        console.log('RES', res);
      });
  }
}
