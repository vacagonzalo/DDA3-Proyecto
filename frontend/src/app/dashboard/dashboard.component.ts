import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Reading } from '../models/reading';
import { ReadingsService } from '../services/readings.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public deviceId: number = 0;
  public dataSource: Array<Reading> = new Array<Reading>();

  public displayedColumns: string[] = [
    'date', 'temperature', 'humidity', 'actuator'
  ];

  Highcharts = Highcharts;
  chartOptions: {};
  private temperature: Array<number> = new Array<number>();
  private humidity: Array<number> = new Array<number>();

  constructor(
    private route: ActivatedRoute,
    private endpoint: ReadingsService
  ) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.deviceId = id;
    this.endpoint.getAllOf(this.deviceId, { from: "", to: "" })
      .then(res => {
        this.dataSource = res;
        this.dataSource.forEach((value) => {
          this.temperature.push(value.temperature);
          this.humidity.push(value.humidity);
          this.configChart();
        });
      })
      .then(err => {
        console.log(err);
      })


  }
  
  private configChart(): void {
    this.chartOptions = {
      
      title: {
        text: ''
      },
      
      subtitle: {
        text: ''
      },
      
      yAxis: {
        title: {
          text: ''
        }
      },
      
      xAxis: {
        accessibility: {
          rangeDescription: ''
        }
      },
      
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 1
        }
      },
      
      series: [{
        name: 'Temperature',
        data: this.temperature
      }, {
        name: 'Humidity',
        data: this.humidity
      }],
      
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    } 
  } 
}