import { Component, OnInit } from '@angular/core';
import {TrainerService} from '../../../services/trainer.service';

@Component({
  selector: 'pick-trainer-menu',
  templateUrl: './pick-trainer-menu.component.html',
  styleUrls: ['./pick-trainer-menu.component.scss']
})
export class PickTrainerMenuComponent implements OnInit {

  selected = 'close to you';

  constructor(private trainerService: TrainerService) { }

  ngOnInit() {
    this.getTrainers();
  }

  getTrainers() {
    this.trainerService.getRecentlyRegisteredTrainers()
      .subscribe((res) => {
        console.log('res', res);
      });
  }

  switchMenu(menu) {
    this.selected = menu;
  }

}
