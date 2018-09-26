import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { EosapiProvider } from '../../providers/eosapi/eosapi';

@IonicPage()
@Component({
  selector: 'page-comerciante',
  templateUrl: 'comerciante.html',
})

export class ComerciantePage {

  step:any = null;
  errorMsg:string;
  signOfferForm: FormGroup;

  public accountName: string;
  public saldo: any;
  public hasAccount = new BehaviorSubject<boolean>(this.userHasAccount());
  public balanceReceived = false;
  public balanceBlux: any;
  public history: any;
  public localAccount: any;
  public hasAddedOffer: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eosapi: EosapiProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,)
    {
   
    this.signOfferForm = new FormGroup({

      store_name: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      product_name: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      product_description: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      product_ref_code: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      product_img_url: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),     
      original_price_brl: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      offer_price_rnv: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      product_discount: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),      
      final_price_rnv: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),

    });

    this.errorMsg = '';

  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ComerciantePage');
  }

  ionViewWillEnter() {
    // this.setLocalAccount() // Instancia uma account para a aplicação se disponivel
    if (this.userHasAccount()) {
      this.setLocalAccount();
    }
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
      const localAccount = JSON.parse(this.userLocalAccount());
      const accountName = localAccount.eosActiveKeys.accountName;
      this.getBalance(accountName);
    }
  }

  // Busca o saldo do account do cliente para o contrato blucoin e retorna o saldo dos token BLUM(blucoin meal) e BLUX(blucoin regular)
  getBalance(account_name) {
    setInterval(() => {
      this.getUserBalance(account_name);
      this.hasBalanceReceived();
      this.history = this.eosapi.getBlucoinActions('blucoin', this.accountName);
    }, 2000);
  }

  getUserBalance(account_name) {
    this.eosapi.getBalance('blucoin', account_name, 'BLUX').then(blux => {
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

  addOffer() {

  }


}
