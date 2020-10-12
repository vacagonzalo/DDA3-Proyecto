import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Reading } from '../models/reading';
import { ReadingsService } from '../services/readings.service';
import { ActivatedRoute, Router } from '@angular/router'
import { OrdersMqttService } from '../services/orders-mqtt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public deviceId: number = 0;
  public deviceName: string = '';
  public state: boolean = false;
  public buttonText: string = '';
  public dataSource: Array<Reading> = new Array<Reading>();

  public displayedColumns: string[] = [
    'date', 'temperature', 'humidity'
  ];

  Highcharts = Highcharts;
  chartOptions: {};
  private temperature: Array<number> = new Array<number>();
  private humidity: Array<number> = new Array<number>();

  constructor(
    private route: ActivatedRoute,
    private endpoint: ReadingsService,
    private mqtt: OrdersMqttService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.deviceId = id;
    let name = this.route.snapshot.paramMap.get('name');
    this.deviceName = name;
    this.endpoint.getAllOf(this.deviceId, { from: "", to: "" })
      .then(res => {
        this.dataSource = res;
        this.dataSource.forEach((value) => {
          this.temperature.push(value.temperature);
          this.humidity.push(value.humidity);
          this.configChart();
          let lastIndex = this.dataSource.length - 1;
          this.state = this.dataSource[lastIndex].actuator;
          if(this.state) {
            this.buttonText = 'Turn off';
          } else {
            this.buttonText = 'Turn on';
          }
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
  public order() {
    if(this.state) {
      this.mqtt.actuator({name: this.deviceName, action: "off"});
      this.buttonText = 'Turn on';
    } else {
      this.mqtt.actuator({name: this.deviceName, action: "on"});
      this.buttonText = 'Turn off';
    }
    this.state = !this.state;
  }

  public edit() {
    this.router.navigate(['/home']);
  }
  public delet() {
    this.router.navigate(['/home']);
  }
}