import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  URL: string = "http://localhost:9999/devices/";

  constructor(private http: HttpClient) { }

  public get(): Promise<Array<Device>> {
    return this.http.get(this.URL).toPromise()
      .then((devices: Array<Device>) => { return devices; })
      .catch((err) => { 
        console.log(err);
        return new Array<Device>();
      })
  }

  public post() { }

  public put() { }

  public delete() { }

}
