import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-client-feed',
  templateUrl: './client-feed.component.html',
  styleUrls: ['./client-feed.component.scss']
})
export class ClientFeedComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.loadAllUpdates();
  }

  loadAllUpdates() {
    console.log('started loading all the updates');
    this.clientService.loadAllUpdates()
      .subscribe((res) => {
        console.log('res', res);
      });
  }



}
