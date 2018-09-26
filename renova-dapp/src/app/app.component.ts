import { Component, ViewChild } from '@angular/core';
import { Nav, AlertController, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StartPage } from '../pages/start/start';
import { ListPage } from '../pages/list/list';

import { EosapiProvider } from '../providers/eosapi/eosapi';
import * as jsPDF from 'jspdf';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;

  pages: Array<{title: string, component: any}>;

  qrValue: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public eosapi: EosapiProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: StartPage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public createPDF() {
    this.qrValue = this.userLocalprotectedKey();
    const publicKey = JSON.parse(localStorage.getItem('eos_activeKeys.')).eosActiveKeys.public;

    const accountName = JSON.parse(localStorage.getItem('eos_activeKeys.')).eosActiveKeys.accountName;

    setTimeout(function() {
      // tslint:disable-next-line:max-line-length
      const logo = 'data:image/png;base64,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';
      const imgData = document.getElementsByClassName('aclass').item(0).children[0].attributes[0].nodeValue;

      const doc = new jsPDF();
      doc.setFontSize(40);
      doc.text(90, 30, 'Renova');
      doc.setFontSize(12);
      doc.text(10, 50, 'AccountName:');
      doc.text(10, 55, 'PubKey:');
      doc.text(40, 50, accountName);
      doc.text(40, 55, publicKey );
      doc.addImage(logo, 'svg', 15, 10, 30, 30);
      doc.addImage(imgData, 'JPEG', 15, 70, 180, 180);
      doc.text(10, 270, 'Utilize esse QR code para a importação da sua carteira. Salve o documento em um local seguro.');
      doc.save('Renova_' + accountName + '.pdf');    }, 500);
  }



  userLocalprotectedKey() {
    return JSON.parse(localStorage.getItem('eos_activeKeys.')).eosActiveKeys.private;
  }

  async unlockKey(privateKey, pin) {
    return this.eosapi.descrpty(privateKey, pin)
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.log(error);
    });

  }

  confirmLogout() {
    const alert = this.alertCtrl.create({
      title: 'Sair do App',
      message: 'Tem certeza de que deseja remover sua conta do App? Se não houver exportado sua conta não será possível recuperá-la!',
      buttons: [
        'Cancelar',
        {
          text: 'Tenho certeza',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('eos_activeKeys.');

    this.nav.setRoot(StartPage);
    // Go back to the home route
    // this.navCtrl.setRoot(HomePage);
  }

}
