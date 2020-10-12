import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { DevicesService } from '../services/devices.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  public devices: Array<Device>;
  constructor(public endpoint: DevicesService,
    private router: Router) {
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

  onSelect(id, name) {
    this.router.navigate(['/dashboard',id,name]);
  }

}
