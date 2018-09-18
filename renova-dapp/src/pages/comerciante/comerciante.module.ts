import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComerciantePage } from './comerciante';

@NgModule({
  declarations: [
    ComerciantePage,
  ],
  imports: [
    IonicPageModule.forChild(ComerciantePage),
  ],
})
export class ComerciantePageModule {}
