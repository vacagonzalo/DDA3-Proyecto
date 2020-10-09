import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  public testList: Array<Device>;
  constructor(private endpoint: DevicesService) {
    this.endpoint.get()
      .then((data) => {
        this.testList = data;
      })
      .catch((data) => {
        this.testList = data;
      })
  }

  ngOnInit(): void {
  }

}
