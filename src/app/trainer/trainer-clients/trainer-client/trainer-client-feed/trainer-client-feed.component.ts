import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainerService} from '../../../../services/trainer.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-trainer-client-feed',
  templateUrl: './trainer-client-feed.component.html',
  styleUrls: ['./trainer-client-feed.component.scss']
})
export class TrainerClientFeedComponent implements OnInit, OnDestroy {

  trainerId: string;
  clientId: string;

  scheduledWorkouts = [];
  clientUpdates = [];

  updatesStart = 0;
  updatesEnd = 3;

  ngUnsubscribe = new Subject();

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
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        console.log('RES', res);
        this.scheduledWorkouts = res['workouts'];
      });
  }

  loadClientUpdates() {
    this.trainerService.loadClientUpdates(this.clientId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.clientUpdates = res['updates'];
      });
  }

  loadMoreUpdates() {
    this.updatesEnd = this.updatesEnd + 3;
  }

  navigateNewWorkout() {
    this.router.navigateByUrl(`/trainer/${this.trainerId}/clients/${this.clientId}/workouts`);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
