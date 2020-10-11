import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatSidenavModule } from '@angular/material/sidenav';

const MaterialComponetes = [
  MatButtonModule,
  MatTableModule,
  MatSidenavModule
];

@NgModule({
  imports: [MaterialComponetes],
  exports: [MaterialComponetes]
})
export class MaterialModule { }
