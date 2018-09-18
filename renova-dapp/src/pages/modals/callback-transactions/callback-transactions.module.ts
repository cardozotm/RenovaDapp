import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallbackTransactionsPage } from './callback-transactions';

@NgModule({
  declarations: [
    CallbackTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(CallbackTransactionsPage),
  ],
})
export class CallbackTransactionsPageModule {}
