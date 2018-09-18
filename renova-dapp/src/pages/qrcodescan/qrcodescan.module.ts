import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodescanPage } from './qrcodescan';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    QrcodescanPage,
  ],
  imports: [
    ZXingScannerModule.forRoot(),
    IonicPageModule.forChild(QrcodescanPage),
  ],
})
export class QrcodescanPageModule {}