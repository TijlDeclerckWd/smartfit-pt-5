import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {TrainerService} from '../../services/trainer.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'pick-trainer',
  templateUrl: './pick-trainer.component.html',
  styleUrls: ['./pick-trainer.component.scss']
})
export class PickTrainerComponent implements OnInit, OnDestroy {

  // the width of the screen
  innerWidth;

  trainers = [];

  ngUnsubscribe = new Subject();

  constructor(private clientService: ClientService, private trainerService: TrainerService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.getTrainers();
  }

  getTrainers() {
    this.trainerService.getRecentlyRegisteredTrainers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        console.log('received trainers from backend', res);
        this.trainers = res['trainers'];
      });
  }

  searchTrainer(e) {
    // look for trainers based on the input of users
    this.clientService.searchTrainer(e)
      .pipe(
        debounceTime(500),
        takeUntil(this.ngUnsubscribe)
        )
      .subscribe((res: any) => {
        this.trainers = res.trainers;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
