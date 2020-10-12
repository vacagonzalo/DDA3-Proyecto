import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  public deviceId: number = 0;
  public deviceName: string = '';
  public name: string = '';
  constructor(
    private route: ActivatedRoute,
    private endpoint: DevicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.deviceId = id;
    let name = this.route.snapshot.paramMap.get('name');
    this.deviceName = name;
  }

  public edit(): void {
    this.endpoint.put({ id: this.deviceId, name: this.name })
      .then(value => {
        console.log(value);
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log(err);
        this.router.navigate(['/home']);
      })
  }

}
