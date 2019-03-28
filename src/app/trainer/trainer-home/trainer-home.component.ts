import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.scss']
})
export class TrainerHomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
