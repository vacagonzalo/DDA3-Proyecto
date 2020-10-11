import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'

const MaterialComponetes = [
  MatButtonModule,
  MatTableModule
];

@NgModule({
  imports: [MaterialComponetes],
  exports: [MaterialComponetes]
})
export class MaterialModule { }
