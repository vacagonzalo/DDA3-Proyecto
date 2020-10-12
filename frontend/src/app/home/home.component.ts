import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name: string = '';

  constructor(private endpoint: DevicesService) { }

  ngOnInit(): void { }

  public create() { 
    console.log(`create ${this.name}!!!`);
    this.endpoint.post(this.name.toLowerCase())
      .then(value => {
        if(value) {
          console.log("created");
        } else {
          console.log("not created");
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}
