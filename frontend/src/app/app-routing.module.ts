import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesListComponent } from './devices-list/devices-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'device-list',
    pathMatch: 'full'
  },
  {
    path: 'device-list',
    component: DevicesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
