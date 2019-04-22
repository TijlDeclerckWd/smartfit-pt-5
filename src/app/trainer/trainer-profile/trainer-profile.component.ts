import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainerService} from '../../services/trainer.service';

@Component({
  selector: 'trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss']
})
export class TrainerProfileComponent implements OnInit {

  selectedMenu = 'main';
  description = '';
  schedule = [];

  profile = null;


  constructor(private route: ActivatedRoute, private trainerService: TrainerService) { }

  ngOnInit() {
  // here we load the user profile and the change the description and then assign
    this.route.params.subscribe((params) => {
      this.getProfile(params.trainerId);
    });
  }


  changeMenu(menu) {
    this.selectedMenu = menu;
  }

  getProfile(trainerId) {
    this.trainerService.getProfile(trainerId)
      .subscribe((res: any) => {
      this.profile = res.trainer;
    });
  }

}
