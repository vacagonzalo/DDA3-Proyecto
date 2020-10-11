import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { ReadingsLogComponent } from './readings-log/readings-log.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'readings-log',
    pathMatch: 'full'
  },
  {
    path: 'device-list',
    component: DevicesListComponent
  },
  {
    path: 'readings-log',
    component: ReadingsLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
