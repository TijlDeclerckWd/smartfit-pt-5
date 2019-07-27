import {Component, OnInit, ViewChild} from '@angular/core';
import {Color} from 'ng2-charts';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import * as Chart from 'chart.js';
import {StatsService} from '../../../services/stats.service';

@Component({
  selector: 'app-completed-workouts',
  templateUrl: './completed-workouts.component.html',
  styleUrls: ['./completed-workouts.component.scss']
})
export class CompletedWorkoutsComponent implements OnInit {

  myChart;
  @ViewChild('chart') chart;

  // How we receive the data from backend
  data = [];
  // How we use the data in the chart
  organizedData = [];


  constructor(private ngxService: NgxUiLoaderService, private statsService: StatsService) { }

  async ngOnInit() {
    // overlay while we prepare the chart
    this.ngxService.start();
    // call server to see how many workouts this client has completed
    await this.getTotalWorkouts();
    // to display the x and Y axis of the chart appropriately
    this.organizeData();
    // Actual creation of the chart
    this.createNewChart();
    // Stop the overlay
    this.ngxService.stop();
  }

  createNewChart() {
    const ctx = this.chart.nativeElement.getContext('2d');

    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Total workouts',
          data: this.organizedData,
          lineTension: 0,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Total workouts"
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              tooltipFormat: 'l',
              unit: 'day'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Rep Max'
            }
          }]
        }
      }
    });
  }

  // Get the total amount of workouts from this particular client
  getTotalWorkouts() {
    return new Promise(resolve => {
      this.statsService.getTotalWorkouts()
        .subscribe((res: {data}) => {
          console.log('result', res);
          this.data = res.data.sort((a, b) => {
            return a.date > b.date ? 1 : -1;
          });
          resolve();
        });
    });
  }

  // prepare for the X and Y-axis
  organizeData() {
    this.organizedData = this.data.map((item, index) => {
      return { x: item.date, y: index + 1 };
    });
  }

}
