import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EditFormComponent } from './edit-form/edit-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard/:id/:name',
    component: DashboardComponent,
  },
  {
    path: 'edit/:id/:name',
    component: EditFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
