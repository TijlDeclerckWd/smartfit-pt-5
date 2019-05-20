import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainerService} from '../../services/trainer.service';
import {AuthService} from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import {NotifierService} from 'angular-notifier';

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

  isOwnProfile = false;

  trainerId;

  profilePic = [];

  BASE_BE_URL = environment.BASE_BE_URL;

  constructor(
    private route: ActivatedRoute,
    private trainerService: TrainerService,
    private authService: AuthService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {

    this.trainerId = this.route.snapshot.params.trainerId ? this.route.snapshot.params.trainerId : this.route.parent.snapshot.params.trainerId;
    this.getProfileStatus();
    this.getProfile(this.trainerId);
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

  getProfileStatus() {
    this.authService.getId()
      .subscribe((res) => {
        this.isOwnProfile = res['userId'] == this.trainerId;
      });
  }

  openImgMenu() {

  }

  uploadProfilePicture(e) {

    this.profilePic = e.target.files;

  //  create formdata
    if (this.profilePic) {
      const formdata = new FormData();
      formdata.append('profilePic', this.profilePic[0], this.profilePic[0]['name']);

      this.trainerService.uploadProfilePic(formdata)
        .subscribe((res) => {
          this.profile = res['updatedTrainer'];
          this.notifierService.notify('success', 'You successfully uploaded the profile picture');
        });
    }
  }
}
