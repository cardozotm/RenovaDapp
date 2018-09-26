import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { EosapiProvider } from '../../providers/eosapi/eosapi';
//import { CallbackTransactionsPage } from '../modals/callback-transactions/callback-transactions';
import { StartPage } from '../start/start';
import { Content } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-carteira',
  templateUrl: 'carteira.html',
})

// tslint:disable-next-line:component-class-suffix
export class CarteiraPage {
  @ViewChild(Content) content: Content;

  qrerror: any;

  section: string = 'two';
  somethings: any = new Array(20);

  public accountName: string;
  public saldo: any;
  public accounts = new Observable;
  public hasAccount = new BehaviorSubject<boolean>(this.userHasAccount());
  public balanceReceived = false;
  private localAccount: any = null;
  public balanceBlum: any;
  public balanceBlux: any;
  public history: any;
  public cordovaIsAvalible: boolean;
  public offerList: any;

  constructor(
    public navCtrl: NavController,
    public eos: EosapiProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public plt: Platform) {

    this.qrerror = navParams.get('qrerror');
    this.offerList = [
      {
        title: "Bolsa Feminina Azul",
        merchant: "Loja da Tia Joana",
        thumbnail: "",
        discount: "20%",
        value: "50 RNV",
      },
      {
        title: "Bolsa Feminina Azul",
        merchant: "Loja da Tia Joana",
        thumbnail: "",
        discount: "20%",
        value: "50 RNV",
      },
      {
        title: "Bolsa Feminina Azul",
        merchant: "Loja da Tia Joana",
        thumbnail: "",
        discount: "20%",
        value: "50 RNV",
      },
    ]

  }
  ionViewWillEnter() {
    // this.setLocalAccount() // Instancia uma account para a aplicação se disponivel
    if (this.userHasAccount()) {
      this.setLocalAccount();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarteiraPage');
  }



  // Nav Functions
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page);
  }
  pushPageQr(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page, {
      from: 'qrcode',
      balance: this.saldo,
      context: 'transfer'
    });
  }

  pushPageManual(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page, {
      from: 'manual',
      balance: this.saldo
    });
  }

  // Eos Functions

  // Verifica se o usuário possui um par de chaves armazenado no storageLocation e retorna false ou true
  userHasAccount(): boolean {
    return !!localStorage.getItem('eos_activeKeys.');
  }

  hasBalanceReceived() {
    if (this.saldo >= 0) {
      this.balanceReceived = true;
      return true;
    } else {
      this.balanceReceived = false;
      return false;
    }
  }

  // Retorna o conteúdo das chaves armazenadas no storageLocation
  userLocalAccount() {
    return localStorage.getItem('eos_activeKeys.');
  }

  // Instancia uma account salva no storageLocation para ser usada pela aplicação
  setLocalAccount() {
    if (this.userHasAccount() === true) {
      this.localAccount = JSON.parse(this.userLocalAccount());
      this.accountName = this.localAccount.eosActiveKeys.accountName;
      this.getBalance(this.localAccount.eosActiveKeys.accountName);
    }
  }

  // Busca o saldo do account do cliente para o contrato blucoin e retorna o saldo dos token BLUM(blucoin meal) e BLUX(blucoin regular)
  getBalance(account_name) {
    setInterval(() => {
      this.getUserBalance(account_name);
      this.hasBalanceReceived();
      this.history = this.eos.getBlucoinActions('blucoin', this.accountName);
    }, 2000);
  }

  getUserBalance(account_name) {
    this.eos.getBalance('blucoin', account_name, 'BLUX').then(blux => {
      const obj = blux;
      const result = Object.keys(obj).map(function (key) {
        return [Number(key), obj[key]];
      });
      if (result.length > 0) {
        this.balanceBlux = parseFloat(blux.toString().slice(0, -7));
      } else {
        this.balanceBlux = 0;
      }
    })
      .catch(err => {
        console.log(err);
      });

    this.saldo = this.balanceBlux;
  }

}
