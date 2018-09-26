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
<<<<<<< HEAD
    public loadingCtrl: LoadingController)
=======
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,)
>>>>>>> e014ee8eb9f38f0fafafacd721ecf92601eabe66
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

    this.getUserInfo();

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

<<<<<<< HEAD
  signOffer() {

    this.presentLoading();

    const store_name = this.signOfferForm.value.store_name;
    const product_name = this.signOfferForm.value.product_name;
    const product_description = this.signOfferForm.value.product_description;
    const product_ref_code = this.signOfferForm.value.product_ref_code;
    const product_img_url = this.signOfferForm.value.product_img_url;
    const original_price_brl = this.signOfferForm.value.original_price_brl;
    const offer_price_rnv = this.signOfferForm.value.offer_price_rnv;
    const product_discount = this.signOfferForm.value.product_discount;
    const constfinal_price_rnv = this.signOfferForm.value.constfinal_price_rnv;

    


    console.log()
    const status = 1;

    const offer_data = {
       store_name: this.signOfferForm.value.store_name,
       product_name: this.signOfferForm.value.product_name,
       product_description: this.signOfferForm.value.product_description,
       product_ref_code: this.signOfferForm.value.product_ref_code,
       product_img_url:  this.signOfferForm.value.product_img_url,
       original_price_brl: this.signOfferForm.value.original_price_brl,
       offer_price_rnv: this.signOfferForm.value.offer_price_rnv,
       product_discount: this.signOfferForm.value.product_discount,
       constfinal_price_rnv: this.signOfferForm.value.constfinal_price_rnv
    };
/*
        this.eosapi.createAccountForUser(user, pin, gov_id, user_data, type.valueOf(), status.valueOf()).then(resp => {
          if (resp === 'success') {
            this.openPage('CarteiraPage');
          }
        });
  */
  
      }

    // Loading
    presentLoading() {
      console.log('presentLoading called');
      const loading = this.loadingCtrl.create({
        spinner: 'bubbles',
  
      });
  
      loading.present();
  
      setTimeout(() => {
        loading.dismiss();
      }, 3000);
  
    }


    async getUserInfo() {
      const account = 'renovasys';
      const contract = 'renovasys';
      const table = 'user';

      const localAccount = JSON.parse(this.userLocalAccount());
      const accountName = localAccount.eosActiveKeys.accountName;

      console.log(accountName);

      await this.eosapi.eos.getTableRows(
        { json: true, scope: account, code: contract, table: table, key_type: 'name' })
        .then(res => {
          const row = res.rows;
          console.log(row);
          row.map(client => {
            const clientName = this.eosapi.format.decodeName(client.account_name, false);
            console.log(clientName);
            // Atribui os valores do usuario de acordo com a resposta na chain
  
            if (clientName === accountName) {
              const parsedUserData = JSON.parse(client.user_data);
              console.log(parsedUserData);
  /*
              this.userProfile = {
                name: parsedUserData.name,
                surname: parsedUserData.surname,
                postalCode: parsedUserData.postalCode,
                street: parsedUserData.street,
                addNumber: parsedUserData.addNumber,
                city: parsedUserData.city,
                state: parsedUserData.state,
              };
  */
              // console.log(this.userProfile);
            }
  
          });
        })
  
        // Tratar erros de requisição
        .catch(err => {
          console.log(err);
        });
    }

=======
  addOffer() {
    console.log(this.signOfferForm.value)
  }
>>>>>>> e014ee8eb9f38f0fafafacd721ecf92601eabe66


}
