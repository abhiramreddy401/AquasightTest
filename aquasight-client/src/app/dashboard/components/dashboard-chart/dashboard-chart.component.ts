import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartComponent implements OnInit, AfterViewInit {
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',

      data: {
        datasets: [
          {
            label: 'Flow',
            backgroundColor: 'rgba(255, 99, 132,0.4)',
            borderColor: 'rgb(255, 99, 132)',
            fill: true,
            data: [
              { x: 1, y: 2 },
              { x: 2500, y: 2.5 },
              { x: 3000, y: 5 },
              { x: 3400, y: 4.75 },
              { x: 3600, y: 4.75 },
              { x: 5200, y: 6 },
              { x: 6000, y: 9 },
              { x: 7100, y: 6 },
            ],
          },
          {
            label: 'Pressure',
            backgroundColor: 'rgba(255, 10, 132,0.4)',
            borderColor: 'rgb(255, 40, 132)',
            fill: true,
            data: [
              { x: 1, y: 4 },
              { x: 2000, y: 2.5 },
              { x: 3500, y: 6 },
              { x: 3400, y: 7.75 },
              { x: 3600, y: 4.75 },
              { x: 5200, y: 6 },
              { x: 6000, y: 9 },
              { x: 7100, y: 6 },
            ],
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'flow',
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              ticks: {
                userCallback: function (tick) {
                  if (tick >= 1000) {
                    return (tick / 1000).toString();
                  }
                  return tick.toString();
                },
              },
              scaleLabel: {
                labelString: 'value',
                display: true,
              },
            },
          ],
          yAxes: [
            {
              type: 'linear',
              scaleLabel: {
                labelString: 'flow',
                display: true,
              },
            },
            {
              type: 'linear',
              position: 'right',
              scaleLabel: {
                labelString: 'pressure',
                display: true,
              },
            },
          ],
        },
      },
    });
  }
  constructor() {}

  ngOnInit(): void {}
}
