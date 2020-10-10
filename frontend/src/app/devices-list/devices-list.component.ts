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

  public turnOn(): void { }

  public turnOff(): void { }
}
