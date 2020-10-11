import { Component, OnInit } from '@angular/core';
import { OrdersMqttService } from '../services/orders-mqtt.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  constructor(public orders: OrdersMqttService) { }

  ngOnInit(): void { }

  public turnOn(): void {
    let s: boolean = false;
    this.orders.actuator({ name: "esp32", action: "on" })
      .then(res => {
        s = res;
      })
      .catch(err => {
        s = false;
      })
    console.log(s);
  }

  public turnOff(): void {
    let s: boolean = false;
    this.orders.actuator({ name: "esp32", action: "off" })
      .then(res => {
        s = res;
      })
      .catch(err => {
        s = false;
      })
    console.log(s);
  }
}
