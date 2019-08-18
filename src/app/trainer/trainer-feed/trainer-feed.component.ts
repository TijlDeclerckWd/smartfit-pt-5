import { Component, OnInit } from '@angular/core';
import {TrainerService} from '../../services/trainer.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-trainer-feed',
  templateUrl: './trainer-feed.component.html',
  styleUrls: ['./trainer-feed.component.scss']
})
export class TrainerFeedComponent implements OnInit {

  updates = [];
  clients = [];

  notifier: NotifierService;

  constructor(private trainerService: TrainerService, private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getAllUpdates();
  }

  getAllUpdates() {
    this.trainerService.getAllUpdates()
      .subscribe((res: any) => {
        this.updates = res.trainer.updates;
        this.clients = res.trainer.clients;
      });
  }

  handleRequestResponse(response, update) {
    console.log('update', update);
    this.trainerService.handleRequestResponse(response)
      .subscribe((res) => {
        console.log('RES', res);
        this.notifier.notify( 'success', 'Successfully added client' );
        // remove this update from the list
        const index = this.updates.findIndex((item) => item._id == update._id);
        this.updates.splice(index, 1);
      //  update the client list
        console.log('request client', response.client);
      });
  }
}
