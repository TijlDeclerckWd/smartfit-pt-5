import {Component, OnInit, ViewChild} from '@angular/core';
import {StatsService} from '../../../services/stats.service';
import * as Chart from 'chart.js';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-weight-stats',
  templateUrl: './weight-stats.component.html',
  styleUrls: ['./weight-stats.component.scss']
})
export class WeightStatsComponent implements OnInit {

  @ViewChild('chart') chart;

  weight = [];
  filteredWeight = [];

  chartData;

  count = 0;

  newWeightValue;

  constructor(private statsService: StatsService) { }

  async ngOnInit() {
    await this.getWeightStats();
    this.filterWeights();
    this.prepareData();

    this.createNewChart();
  }

  addNewWeight() {
    this.statsService.addNewWeight(this.newWeightValue)
      .subscribe((res: any) => {
        this.filteredWeight.unshift(res.newValue);
        this.chartData.unshift({ x: res.newValue.date, y: res.newValue.weight });
        this.chart.update();
        // show that adding was successful
      });
  }

  changeNewWeightValue(value) {
    console.log('type', typeof value.count);
    this.newWeightValue = value;
  }

  createNewChart() {
    const ctx = this.chart.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Weight in KG',
          data: this.chartData,
          backgroundColor: [
            'rgba(0, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          lineTension: .6
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Weight',
          fontColor: '#000',
          position: 'bottom'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              tooltipFormat: 'l',
              unit: 'day'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

  deleteWeight(item) {
    this.statsService.deleteWeight(item._id)
      .subscribe((res) => {
        console.log('deleted', res);
        this.filteredWeight = this.filteredWeight.filter((weight) =>  item._id !== weight._id);
        this.prepareData();
        this.chart.update();
      });
  }

  filterWeights() {
    console.log('this.weight', this.weight);
    this.filteredWeight = this.weight.slice(0, 5);
    console.log('filteredWeights', this.filteredWeight);
  }

  getWeightStats() {
    return new Promise((resolve) => {
      this.statsService.getWeightStats()
        .subscribe((res: any) => {
          this.weight = res.data.bodyWeight.reverse();
          this.count = this.weight[0].weight;
          resolve();
        });
    });
  }

  prepareData() {
    this.chartData = this.filteredWeight.map((item) => {
      return { x: item.date, y: item.weight };
    });

    console.log('chartData', this.chartData);
  }
}
