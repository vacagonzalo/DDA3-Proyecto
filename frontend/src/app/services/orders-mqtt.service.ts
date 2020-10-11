import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersMqttService {
  private URL: string = "http://localhost:9999/orders/";
  constructor(private http: HttpClient) { }

  public actuator(order: Order): Promise<boolean> {
    return this.http.put(this.URL, order,
      {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        observe: 'response',
        responseType: 'text'
      })
      .toPromise()
      .then(res => {
        console.log(res);
        console.log(res.status);
        return res.status == 200;
      })
      .catch(err => {
        console.log(err);
        return false;
      })
  }

}
