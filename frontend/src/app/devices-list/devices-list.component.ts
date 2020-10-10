import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { Reading } from '../models/reading';
import { DevicesService } from '../services/devices.service';
import { ReadingsService } from '../services/readings.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  public devices: Array<Device>;
  public readings: Array<Reading>;
  public last: Array<Reading>;
  constructor(private endpoint: DevicesService, private apiReadings: ReadingsService) {
    this.endpoint.get()
      .then((data) => {
        this.devices = data;
      })
      .catch((err) => {
        console.log(err);
        this.devices = new Array<Device>();
      })

    this.apiReadings.getSomeOf(2,10)
      .then((data) => {
        this.readings = data;
      })
      .catch((err) => {
        console.log(err);
        this.readings = new Array<Reading>();
      })

    this.apiReadings.getLastOf(2)
      .then((data) => {
        this.last = data;
      })
      .catch((err) => {
        console.log(err);
        this.last = new Array<Reading>();
      })
  }

  ngOnInit(): void {
  }

  public postTest(): void {
    this.endpoint.post("postTest")
      .then(res => {
        console.log(`postTest() -> ${res}`);
      })
      .catch(err => {
        console.log(`postTest() error -> ${err}`);
      })
  }

  public putTest(): void {
    this.endpoint.put({ id: 6, name: "putTest" })
      .then(res => {
        console.log(`postTest() -> ${res}`);
      })
      .catch(err => {
        console.log(`postTest() error -> ${err}`);
      })
  }

  public deleteTest(): void {
    this.endpoint.delete(6)
      .then(res => {
        console.log(`postTest() -> ${res}`);
      })
      .catch(err => {
        console.log(`postTest() error -> ${err}`);
      })
  }

}
