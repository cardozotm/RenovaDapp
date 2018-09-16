import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartPage } from './start';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    StartPage,
  ],
  imports: [
    IonicPageModule.forChild(StartPage),
    BrMaskerModule,
  ],
})
export class StartPageModule {}
