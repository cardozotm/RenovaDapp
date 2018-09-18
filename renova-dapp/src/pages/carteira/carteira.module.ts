import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarteiraPage } from './carteira';

@NgModule({
  declarations: [
    CarteiraPage,
  ],
  imports: [
    IonicPageModule.forChild(CarteiraPage),
  ],
})
export class CarteiraPageModule {}
