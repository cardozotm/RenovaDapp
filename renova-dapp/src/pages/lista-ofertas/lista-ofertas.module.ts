import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaOfertasPage } from './lista-ofertas';

@NgModule({
  declarations: [
    ListaOfertasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaOfertasPage),
  ],
})
export class ListaOfertasPageModule {}
