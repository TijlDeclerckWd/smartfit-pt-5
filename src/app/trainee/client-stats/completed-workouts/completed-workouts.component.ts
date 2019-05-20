import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-completed-workouts',
  templateUrl: './completed-workouts.component.html',
  styleUrls: ['./completed-workouts.component.scss']
})
export class CompletedWorkoutsComponent implements OnInit {

   public SystemName: string = "MF1";
  firstCopy = false;

  // data
  public lineChartData: Array<number> = [ 1,8,49,50,51];

  public labelMFL: Array<any> = [
    { data: this.lineChartData,
      label: this.SystemName
    }
  ];

  // labels
  public lineChartLabels: Array<any> =
    ["2018-01-29 10:00:00", "2018-01-29 10:27:00", "2018-01-29 10:28:00", "2018-01-29 10:29:00", "2018-01-29 10:30:00" ];

  constructor() { }

  public lineChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
      }],
      xAxes: [{
        min: '2018-01-29 10:08:00', // how to?
        //  max: '2018-01-29 10:48:00', // how to?
        type: 'time',
        time: {
          unit: 'minute',
          unitStepSize: 10,
          displayFormats: {
            'second': 'HH:mm:ss',
            'minute': 'HH:mm:ss',
            'hour': 'HH:mm',
          },
        },
      }],
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartType = 'line';

  ngOnInit() {
  }

}
