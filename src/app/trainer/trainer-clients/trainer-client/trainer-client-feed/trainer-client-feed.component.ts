import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-trainer-client-feed',
  templateUrl: './trainer-client-feed.component.html',
  styleUrls: ['./trainer-client-feed.component.scss']
})
export class TrainerClientFeedComponent implements OnInit {

  trainerId: string;
  clientId: string;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.trainerId = this.route.snapshot.parent.params.userId;
    this.clientId = this.route.snapshot.parent.params.clientId;
  }

  navigateNewWorkout() {
    this.router.navigateByUrl(`/trainer/${this.trainerId}/clients/${this.clientId}/workouts`);
  }

}
