import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
  saldo:any = 0;
  signOfferForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
    this.signOfferForm = new FormGroup({

      store_name: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      product_name: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      product_ref_code: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      original_price_brl: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      offer_price_rnv: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      final_price_rnv: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      product_discount: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),

    });

    this.errorMsg = '';

  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ComerciantePage');
  }

}
