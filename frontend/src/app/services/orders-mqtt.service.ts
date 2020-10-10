import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersMqttService {
  private endpoint: string = "orders";
  constructor() { }

  public actuator(deviceName:string):void { }

}
