import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { EosapiProvider } from '../../providers/eosapi/eosapi';
import { default as cepPromise } from 'cep-promise';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { zip } from 'rxjs/operators';

import { CarteiraPage } from '../carteira/carteira';


@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
// tslint:disable-next-line:component-class-suffix
export class StartPage {

  street: string;
  state: any;
  neighborhood: string;
  city: string;
  forward: any;
  step: string;
  cepObservable: Observable<object>;
  cep: any;
  actor: any;


  signUpForm: FormGroup;
  public errorMsg: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private eosapi: EosapiProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController, ) {

    this.step = 'welcome';

    this.signUpForm = new FormGroup({

      complete_name: new FormControl('',Validators.compose([Validators.minLength(3),Validators.required])),
      gov_id: new FormControl('',Validators.compose([Validators.minLength(11),Validators.required])),
      street: new FormControl('', ),
      number: new FormControl('',Validators.compose([Validators.pattern('[0-9]*'),Validators.required])),
      neighborhood: new FormControl('', ),
      city: new FormControl('', ),
      state: new FormControl('', ),
      zip: new FormControl('',Validators.compose([Validators.minLength(8),Validators.required])),
      actor: new FormControl('',Validators.compose([Validators.minLength(1),Validators.required])),
      user: new FormControl('',Validators.compose([Validators.minLength(12),Validators.pattern('[a-z1-5]*'),Validators.required])),
      pin: new FormControl('',Validators.compose([Validators.minLength(6),Validators.maxLength(6),Validators.required,Validators.pattern('[0-9]*')])),
      pinconfirm: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.required, Validators.pattern('[0-9]*')]))});

    this.errorMsg = '';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
      
    let eos_activeKeys = JSON.parse(this.hasEosAccount())
    if ( eos_activeKeys.eosActiveKeys.role == '1') {
     this.openPage('CarteiraPage');
    }
  }


  findCep() {
    let cepN = this.cepObservable
    console.log(cepN);
    cepPromise(cepN.toString())
      .then(resp => {
        console.log(resp);
        this.street = resp.street;
        this.city = resp.city;
        this.neighborhood = resp.neighborhood;
        this.state = resp.state;
      })
      .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }
  errorHandler(error: any): void {
    console.log(error);
    this.cepIncorreto()
  }

  cepIncorreto() {
    let alert = this.alertCtrl.create({
      title: 'CEP Incorreto',
      subTitle: 'não foi possivel localizar o endereço através do CEP informado',
      buttons: ['Dispensar']
    });
    alert.present();
  }

  dadosSeguros() {
    let alert = this.alertCtrl.create({
      title: 'Seus dados estão seguros aqui',
      subTitle: 'Todos os dados informados serão criptografados com a sua chave pública e nunca estarão visíveis sem a sua expressa autorização',
      buttons: ['Ok']
    });
    alert.present();
  }

  hasEosAccount() {
    return localStorage.getItem('eos_activeKeys.');
  }

  // Nav Functions
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page);
  }
  pushPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page, {
      context: 'start',
    });
  }

  nextStep(step) {
    this.step = step;
    if(step == 'fase1'){
      this.dadosSeguros();
    }
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

  // Other functions
  restoreAlert() {
    const alert = this.alertCtrl.create({
      title: 'Restaurar carteira',
      message: 'Funcionalidade em desenvolvimento',
    });
    alert.present();
  }

  pinAlert() {
    const alert = this.alertCtrl.create({
      title: 'PIN não confere',
      message: 'Os PINs digitados não são iguais',
      buttons: ['OK']
    });
    alert.present();
  }

  formAlert() {
    const alert = this.alertCtrl.create({
      title: 'Formulário Inválido',
      message: 'Dados inválidos. Por favor confira os dados para a criação de sua carteira.',
      buttons: ['OK']
    });
    alert.present();
  }

  importAlert() {
    const prompt = this.alertCtrl.create({
      title: 'Importar uma conta Exitente ',
      message: 'Informe o PIN da conta.',
      inputs: [
        {
          name: 'PIN',
          placeholder: 'PIN 6 Digitos',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ler QR',
          handler: data => {
            this.navCtrl.push('QrcodescanPage', {
              context: 'start',
              qrpin: data,
            });
          }
        }
      ]
    });
    prompt.present();
  }


  signUp() {

    this.presentLoading();
    
    const user = this.signUpForm.value.user;
    const pin = this.signUpForm.value.pin;
    const gov_id = this.signUpForm.value.gov_id;
    const type = this.signUpForm.value.actor;
    console.log()
    const status = 1;

    const user_data = {
      complete_name: this.signUpForm.value.complete_name,
      gov_id: this.signUpForm.value.gov_id,
      street: this.signUpForm.value.street,
      number: this.signUpForm.value.number,
      neighborhood: this.signUpForm.value.neighborhood,
      city: this.signUpForm.value.city,
      state: this.signUpForm.value.state,
      zip: this.signUpForm.value.zip,
    };

    this.eosapi.getAccountInfo(user)
      .then(hasAccount => {
        this.hasAccountAlert();
      })
      .catch(newAccount => {
        this.eosapi.createAccountForUser(user, pin,  gov_id, user_data, type.valueOf(), status.valueOf()).then(resp => {
          if (resp === 'success') {
            this.openPage('CarteiraPage'); 
          }
        });
      })
  }


  navToWallet() {
    /*   if (this.auth.isLoginSubject.value) {
         this.openPage('CarteiraPage');
       }
   */
  }

  hasAccountAlert() {
    const alert = this.alertCtrl.create({
      title: 'Conta ja existe',
      subTitle: 'Esse nome de conta não está disponivel',
      buttons: ['Cancelar']
    });
    alert.present();
  }

  userLocalAccount() {
    return localStorage.getItem('eos_activeKeys.role');
  }

}
