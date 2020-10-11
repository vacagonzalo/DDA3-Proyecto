import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'

const MaterialComponetes = [
  MatButtonModule
];

@NgModule({
  imports: [MaterialComponetes],
  exports: [MaterialComponetes]
})
export class MaterialModule { }
