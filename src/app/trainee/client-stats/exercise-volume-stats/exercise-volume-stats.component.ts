import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExerciseService} from '../../../services/exercise.service';
import * as Chart from 'chart.js';
import {StatsService} from '../../../services/stats.service';
import * as moment from 'moment';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-exercise-volume-stats',
  templateUrl: './exercise-volume-stats.component.html',
  styleUrls: ['./exercise-volume-stats.component.scss']
})
export class ExerciseVolumeStatsComponent implements OnInit, OnDestroy {

  exercises = [];
  weightLiftedData = [];
  averageRepsData = [];

  myChart;

  @ViewChild('chart') chart;

  ngUnsubscribe = new Subject();

  constructor(private exerciseService: ExerciseService, private statsService: StatsService) { }

  async ngOnInit() {
    await this.getClientExercises();
    this.getExerciseVolumeData(this.exercises[0]._id, true);
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
          data: this.weightLiftedData,
          backgroundColor: [
           'rgba(99, 82, 14, .3)'
          ],
          borderColor: [
            '#444'
          ],
          borderWidth: 1,
          fill: false,
          pointBackgroundColor: '#000'
        }, {
          label: 'Average rep',
          data: this.averageRepsData,
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
          display: false,
          text: "Weight + Reps / Exercise"
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: '#eee'
            },
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
            gridLines: {
              color: '#eee'
            },
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

  async getClientExercises() {
    return new Promise((resolve) => {
      this.exerciseService.getClientExercises()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          this.exercises = res['exercises'];
          console.log('this.exercises', this.exercises);
          resolve();
        });
    });
  }

  getExerciseVolumeData(exerciseId: string, initialFetch?: boolean) {
    this.statsService.getExerciseVolumeData(exerciseId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        console.log('res', res);
        const refactoredData = this.refactorData(res['data']);
        this.weightLiftedData = refactoredData.weightData;
        this.averageRepsData = refactoredData.repData;
        // if this is the first fetch, then we create a new chart...
        if (initialFetch) {
          this.createNewChart();
        } else {
          // if not, we update the existing one
          this.myChart.update();
        }
      });
  }

  refactorData(data) {
    const weightData = [];
    const repData = [];
    console.log('DATA', data);
    // Calculating the average rep, this should be moved to the backend when saving the data
    data.forEach((item) => {
      const averageRep = Math.round((item.reps.reduce((prev, cur) => prev + cur) / item.reps.length) * 100) / 100;
      const date = moment(item.date).format('ll');
      weightData.push({x: date, y: item.weight});
      repData.push({x: date, y: averageRep});
    });

    return {weightData, repData};
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
