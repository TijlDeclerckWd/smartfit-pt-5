import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TrainerService} from '../../../services/trainer.service';

@Component({
  selector: 'confirm-request-notification',
  templateUrl: './confirm-request-notification.component.html',
  styleUrls: ['./confirm-request-notification.component.scss']
})
export class ConfirmRequestNotificationComponent implements OnInit {

  @Input('update') update;

  @Output('handleRequestResponse') handleRequestResponse = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  onResponse(response, request) {
    this.handleRequestResponse.emit({response, request});
  }

}
