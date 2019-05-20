import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainerService} from '../../../../services/trainer.service';

@Component({
  selector: 'app-trainer-client-feed',
  templateUrl: './trainer-client-feed.component.html',
  styleUrls: ['./trainer-client-feed.component.scss']
})
export class TrainerClientFeedComponent implements OnInit {

  trainerId: string;
  clientId: string;

  scheduledWorkouts = [];
  clientUpdates = [];

  updatesStart = 0;
  updatesEnd = 3;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private trainerService: TrainerService) {}

  ngOnInit() {
    this.trainerId = this.route.snapshot.parent.params.userId;
    this.clientId = this.route.snapshot.parent.params.clientId;

    this.loadClientSchedule();
    this.loadClientUpdates();
  }

  anyUpdatesLeft() {
    return this.clientUpdates.length > this.updatesEnd;
  }

  loadClientSchedule() {
    this.trainerService.loadClientSchedule(this.clientId)
      .subscribe((res) => {
        this.scheduledWorkouts = res['workouts'];
      });
  }

  loadClientUpdates() {
    this.trainerService.loadClientUpdates(this.clientId)
      .subscribe((res) => {
        console.log('RES', res);
        this.clientUpdates = res['updates'];
      });
  }

  loadMoreUpdates() {
    this.updatesEnd = this.updatesEnd + 3;
  }

  navigateNewWorkout() {
    this.router.navigateByUrl(`/trainer/${this.trainerId}/clients/${this.clientId}/workouts`);
  }
}
