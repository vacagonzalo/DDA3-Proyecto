import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private URL: string = "http://localhost:9999/devices/";

  constructor(private http: HttpClient) { }

  public get(): Promise<Array<Device>> {
    return this.http.get(
      this.URL,
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .toPromise()
      .then((devices: Array<Device>) => { return devices; })
      .catch((err) => {
        console.log(err);
        return new Array<Device>();
      })
  }

  public post(deviceName: string): Promise<boolean> {
    return this.http.post(
      this.URL, { name: deviceName },
      {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        observe: 'response'
      })
      .toPromise()
      .then(res => {
        return (res.status == 201);
      })
      .catch(err => {
        console.log(err);
        return false;
      })
  }

  public put(modifiedDevice: Device): Promise<boolean> {
    return this.http.put(this.URL, modifiedDevice,
      {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        observe: 'response'
      })
      .toPromise()
      .then(res => {
        return res.status == 200;
      })
      .catch(err => {
        console.log(err);
        return false;
      })
  }

  public delete(id: number): Promise<boolean> {
    return this.http.delete(this.URL + id, { observe: 'response' })
      .toPromise()
      .then(res => {
        return res.status == 200;
      })
      .catch(err => {
        console.log(err);
        return false;
      })
  }

}
