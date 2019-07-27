import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'trainer-feed-clients',
  templateUrl: './trainer-feed-clients.component.html',
  styleUrls: ['./trainer-feed-clients.component.scss']
})
export class TrainerFeedClientsComponent implements OnInit {

  @Input('clients') clients = [];

  BASE_URL = environment.BASE_URL;
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => console.log('CLIETNS', this.clients), 3000);
  }

  visitClient(clientId) {
    const userId = localStorage.getItem('userId');
    //  go to the clients page
    this.router.navigateByUrl(`/trainer/${userId}/clients/${clientId}/feed`);
  }

}
