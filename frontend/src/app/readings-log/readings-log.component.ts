import { Component } from '@angular/core';

import { Reading } from '../models/reading';
import { ReadingsService } from '../services/readings.service';

@Component({
  selector: 'app-readings-log',
  templateUrl: './readings-log.component.html',
  styleUrls: ['./readings-log.component.css']
})
export class ReadingsLogComponent {
  public displayedColumns: string[] = [
    'date', 'temperature', 'humidity', 'actuator'
  ];
  public dataSource: Reading[];
  constructor(private endpoint: ReadingsService) {
    this.dataSource = new Array<Reading>();
    this.endpoint.getAllOf(2, { from: "", to: "" })
      .then(res => {
        this.dataSource = res;
      })
      .catch(err => {
        console.log(err);
      })
  }
}