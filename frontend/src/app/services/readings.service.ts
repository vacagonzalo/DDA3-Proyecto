import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reading } from '../models/reading';
import { Criteria } from '../models/criteria';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  private URL: string = "http://localhost:9999/readings/";
  private all: string = `${this.URL}all/`;
  private allOf: string = `${this.URL}all-of/`;
  private lastOf: string = `${this.URL}last-of/`;
  private someOf: string = `${this.URL}some-of/`;


  constructor(private http: HttpClient) { }

  public getAll(criteria: Criteria): Promise<Array<Reading>> {
    let c = encodeURIComponent(JSON.stringify(criteria));
    return this.http.get(`${this.all}${c}`)
      .toPromise()
      .then((readings: Array<Reading>) => {
        return readings;
      })
      .catch(err => {
        console.log(err);
        return new Array<Reading>();
      })
  }

  public getAllOf(id: number, criteria: Criteria): Promise<Array<Reading>> {
    let c = encodeURIComponent(JSON.stringify(criteria));
    return this.http.get(`${this.allOf}${id}/${c}`)
      .toPromise()
      .then((readings: Array<Reading>) => {
        return readings;
      })
      .catch(err => {
        console.log(err);
        return new Array<Reading>();
      })
  }

  public getLastOf(id: number): Promise<Array<Reading>> {
    return this.http.get(`${this.lastOf}${id}`)
      .toPromise()
      .then((reading: Reading) => {
        let readings = new Array<Reading>();
        readings.push(reading);
        return readings;
      })
      .catch(err => {
        console.log(err);
        return new Array<Reading>();
      })
  }

  public getSomeOf(id: number, amount: number): Promise<Array<Reading>> {
    return this.http.get(`${this.someOf}${id}/${amount}`)
      .toPromise()
      .then((readings: Array<Reading>) => {
        return readings;
      })
      .catch(err => {
        console.log(err);
        return new Array<Reading>();
      })
  }
}
