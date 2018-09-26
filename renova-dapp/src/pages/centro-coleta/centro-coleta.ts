import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Form } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { EosapiProvider } from '../../providers/eosapi/eosapi';

/**
 * Generated class for the CentroColetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-centro-coleta',
  templateUrl: 'centro-coleta.html',
})
export class CentroColetaPage {

  signMatForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eosapi: EosapiProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.signMatForm = new FormGroup({
        mat_name: new FormControl (''),
        mat_description: new FormControl (''),
        mat_id: new FormControl (''),
        mat_img: new FormControl (''),
        mat_price: new FormControl (''),
      });


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CentroColetaPage');
  }

  addMat() {
    console.log(this.signMatForm.value)
  }

}
