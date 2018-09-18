import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CentroColetaPage } from './centro-coleta';

@NgModule({
  declarations: [
    CentroColetaPage,
  ],
  imports: [
    IonicPageModule.forChild(CentroColetaPage),
  ],
})
export class CentroColetaPageModule {}
