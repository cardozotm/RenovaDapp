import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

/**
 * Generated class for the CallbackTransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-callback-transactions',
  templateUrl: 'callback-transactions.html',
})
// tslint:disable-next-line:component-class-suffix
export class CallbackTransactionsPage {
  public result: string;
  private saldo: any;
  private expent: any;
  public errorMsg: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App) {
    this.result = navParams.get('result');
    this.saldo = navParams.get('balance');
    this.expent = navParams.get('expense');
    console.log(this.result);
    this.errorMsg = navParams.get('error');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallbackTransactionsPage');
  }

  // Nav Functions
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.appCtrl.getRootNav().setRoot(page);
    this.navCtrl.pop();
  }
  pushPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page);
  }
  popPage() {
    this.navCtrl.pop();
  }

}
