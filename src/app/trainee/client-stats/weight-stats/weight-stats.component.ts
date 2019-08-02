import {Component, OnInit, ViewChild} from '@angular/core';
import {StatsService} from '../../../services/stats.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-weight-stats',
  templateUrl: './weight-stats.component.html',
  styleUrls: ['./weight-stats.component.scss']
})
export class WeightStatsComponent implements OnInit {

  @ViewChild('chart') chart;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    // this.getWeightStats();
this.createNewChart();
  }

  createNewChart() {
    const ctx = this.chart.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(0, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Weight',
          fontColor: '#fff',
          position: 'bottom',
          padding: 30
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }



  // getWeightStats() {
  //   this.statsService.getWeightStats()
  //     .subscribe((res) => {
  //       console.log('RES', res);
  //     });
  // }

}
