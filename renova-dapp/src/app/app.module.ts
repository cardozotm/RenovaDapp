import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EosapiProvider } from '../providers/eosapi/eosapi';

import { BrMaskerModule } from 'brmasker-ionic-3';

import { CarteiraPageModule } from '../pages/carteira/carteira.module';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [
    MyApp,
    StartPage,
    ListPage,

    ],
  imports: [
    BrowserModule,
    BrMaskerModule,
    NgxQRCodeModule,
    ZXingScannerModule.forRoot(),
    CarteiraPageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EosapiProvider
  ]
})
export class AppModule {}
