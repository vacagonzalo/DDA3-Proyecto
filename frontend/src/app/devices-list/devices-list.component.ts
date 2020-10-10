import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  public devices: Array<Device>;
  constructor(private endpoint: DevicesService) {
    this.endpoint.get()
      .then((data) => {
        this.devices = data;
      })
      .catch((err) => {
        console.log(err);
        this.devices = new Array<Device>();
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
}
