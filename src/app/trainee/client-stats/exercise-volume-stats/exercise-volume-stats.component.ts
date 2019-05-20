import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseService} from '../../../services/exercise.service';
import * as Chart from 'chart.js';
import {StatsService} from '../../../services/stats.service';
import * as moment from 'moment';

@Component({
  selector: 'app-exercise-volume-stats',
  templateUrl: './exercise-volume-stats.component.html',
  styleUrls: ['./exercise-volume-stats.component.scss']
})
export class ExerciseVolumeStatsComponent implements OnInit {

  exercises = [];

  myChart;

  @ViewChild('chart') chart;

  constructor(private exerciseService: ExerciseService, private statsService: StatsService) { }

  ngOnInit() {
    this.getClientExercises();
    this.createNewChart();
  }

  changeSelectedExercise(e) {
this.getExerciseVolumeData(e.target.value);
  }

  createNewChart() {
    const ctx = this.chart.nativeElement.getContext('2d');

    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Weight lifted',
          data: [
            {x: new Date(1990, 4, 11), y: 4 },
            {x: new Date(1990, 6, 12), y: 5 },
            {x: new Date(1990, 8, 13), y: 8 },
            {x: new Date(1990, 4, 13), y: 10 }
          ],
          backgroundColor: [
            '#B9272E'
          ],
          borderColor: [
            '#B9272E)'
          ],
          borderWidth: 1,
          fill: false
        }, {
          label: 'Average rep',
          data: [
            {x: new Date(1990, 4, 11), y: 4 },
            {x: new Date(1990, 6, 12), y: 5 },
            {x: new Date(1990, 8, 13), y: 8 },
            {x: new Date(1990, 4, 13), y: 10 }
          ],
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
          text: "Weight + Reps / Exercise"
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              tooltipFormat: 'll',
              unit: 'day'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false
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

  getClientExercises() {
    this.exerciseService.getClientExercises()
      .subscribe((res) => {
        this.exercises = res['exercises'];
      });
  }

  getExerciseVolumeData(exerciseId) {
    this.statsService.getExerciseVolumeData(exerciseId)
      .subscribe((res) => {
        console.log('res', res);
        const refactoredData = this.refactorData(res['data']);
        this.myChart.data.datasets[0].data = refactoredData.weightData;
        this.myChart.data.datasets[1].data = refactoredData.repData;
        this.myChart.update();
      });
  }

  refactorData(data) {
    const weightData = [];
    const repData = [];
console.log('DATA', data);
    // average reps worden nu hier berekend, maar later wordt dit gedaan bij het opslaan van de data
    data.forEach((item) => {
      const averageRep = Math.round((item.reps.reduce((prev, cur) => prev + cur) / item.reps.length) * 100) / 100;
      const date = moment(item.date).format('ll');
      weightData.push({x: date, y: item.weight});
      repData.push({x: date, y: averageRep});
    });

    return { weightData, repData };
  }
}
