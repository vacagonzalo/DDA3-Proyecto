import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  public devices:Array<Device>;
  constructor(public endpoint:DevicesService) {
    this.devices = new Array<Device>();
    this.endpoint.get()
    .then(res => {
      this.devices = res;
    })
    .catch(err => {
      console.log(err);
    })
  }

  ngOnInit(): void { }

}
