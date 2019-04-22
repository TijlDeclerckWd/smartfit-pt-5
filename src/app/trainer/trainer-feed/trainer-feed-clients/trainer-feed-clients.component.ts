import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'trainer-feed-clients',
  templateUrl: './trainer-feed-clients.component.html',
  styleUrls: ['./trainer-feed-clients.component.scss']
})
export class TrainerFeedClientsComponent implements OnInit {

  @Input('clients') clients = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  visitClient(clientId) {
    const userId = localStorage.getItem('userId');
    //  go to the clients page
    this.router.navigateByUrl(`/trainer/${userId}/clients/${clientId}/feed`);
  }

}
