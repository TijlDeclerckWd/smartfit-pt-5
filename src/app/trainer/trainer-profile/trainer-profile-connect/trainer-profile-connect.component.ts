import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {NotifierService} from 'angular-notifier';

export interface DialogData {
  trainerId: string;
}

@Component({
  selector: 'dialog-content',
  template: `
  <h2>Are you sure you want to send a hire request to this personal trainer?</h2>
  <div class="button-container">
    <button (click)="onAnswerQuestion(true)" class="btn btn-warning">Yes</button>
    <button (click)="onAnswerQuestion(false)" class="btn btn-warning">No</button>
  </div>
  `,
  styles: [`
    .button-container {
      margin-top: 2rem;
      display: flex;
      justify-content: space-around;
    }

    .btn {
      padding: 1rem 2rem;
    }
  `]
})
export class DialogContentComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    private router: Router,
    private clientService: ClientService,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private notifierService: NotifierService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAnswerQuestion(accepted) {
    if (!accepted) {
      this.onNoClick();
    } else {
    // now we want to create a request on the backend and make it display whenever this trainer logs on and wants
    // to display his updates
      const data = {
        trainerId: this.data.trainerId
      };

      this.clientService.sendHireRequest(data)
        .subscribe((res) => {
          console.log('res', res);
          this.notifierService.notify('success', "You have successfully sent a request to this trainer");
          this.onNoClick();
        }, (err) => {
          console.log('ERROR', err);
          this.notifierService.notify('error', err.error.message);
        });
    }
  }
}


@Component({
  selector: 'trainer-profile-connect',
  templateUrl: './trainer-profile-connect.component.html',
  styleUrls: ['./trainer-profile-connect.component.scss'],
  entryComponents: [DialogContentComponent]
})
export class TrainerProfileConnectComponent implements OnInit {

  dialogRef;
  trainerId;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.trainerId = params.trainerId;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '250px',
      data: { trainerId: this.trainerId }
    });
  }
}

