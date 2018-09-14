import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { EosapiProvider } from '../../providers/eosapi/eosapi';
import { default as cepPromise } from 'cep-promise';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { zip } from 'rxjs/operators';


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

      complete_name: new FormControl('',
        Validators.compose([
          Validators.minLength(3),
          Validators.required])
      ),

      gov_id: new FormControl('',
        Validators.compose([
          Validators.minLength(11),
          Validators.required])
      ),

      street: new FormControl('', ),

      number: new FormControl('',
        Validators.compose([
          Validators.pattern('[0-9]*'),
          Validators.required])),

      neighborhood: new FormControl('', ),
      city: new FormControl('', ),
      state: new FormControl('', ),
      zip: new FormControl('',
        Validators.compose([
          Validators.required])),

      actor: new FormControl('',
        Validators.compose([
          Validators.required])),

      user: new FormControl('',
        Validators.compose([
          Validators.minLength(12),
          Validators.pattern('[a-z1-5]*'),
          Validators.required])),

      pin: new FormControl(
        '',
        Validators.compose([Validators.minLength(6),
        Validators.maxLength(6),
        Validators.required,
        Validators.pattern('[0-9]*')
        ])),

      pinconfirm: new FormControl('', Validators.compose([
        Validators.minLength(6), Validators.maxLength(6), Validators.required, Validators.pattern('[0-9]*')
      ]))
    });

    this.errorMsg = '';

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
    //  if (this.hasEosAccount()) {
    // this.openPage('TabsPage');
    //}
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

  hasEosAccount(): boolean {
    return !!localStorage.getItem('eos_activeKeys.');
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
          placeholder: 'PIN 6 Digitos'
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


  signIn(user: string, pin: any) {
    // this.auth.login();
    this.eosapi.getAccountInfo(user)
      .then(resp => {
        this.hasAccountAlert();
      })
      .catch(err => {
        this.eosapi.createAccountForUser(user, pin).then(resp => {
          if (resp === 'success') {
            this.openPage('CarteiraPage');
          }
        });
      });
  }



  signUp() {
    this.presentLoading();
    //    console.log(this.signUpForm.value);
    //    console.log('Validade do formulário: ' + this.signUpForm.valid);
    this.verifyForm();
  }

  navToWallet() {
    /*   if (this.auth.isLoginSubject.value) {
         this.openPage('CarteiraPage');
       }
   */
  }

  verifyForm() {
    this.errorMsg = '';
    if (this.signUpForm.valid) {
      // Confere se os PINs digitados sao iguais
      if (this.signUpForm.value.pin === this.signUpForm.value.pinconfirm) {
        this.signIn(this.signUpForm.value.user, this.signUpForm.value.pin);
      } else {
        this.errorMsg = 'Os PINs digitados não conferem';
        //     this.presentCallback('failure', this.errorMsg);
      }
    } else {
      if (this.signUpForm.controls.user.status === 'INVALID') {
        this.errorMsg += ' Nome de usuário inválido.';
      }
      if (this.signUpForm.controls.pin.status === 'INVALID') {
        this.errorMsg += ' PIN inválido.';
      }
      if (this.signUpForm.controls.pinconfirm.status === 'INVALID') {
        this.errorMsg += ' Os PINs digitados não conferem.';
      }
      // this.presentCallback('failure', this.errorMsg);
    }
  } s

  hasAccountAlert() {
    const alert = this.alertCtrl.create({
      title: 'Conta ja existe',
      subTitle: 'Esse nome de conta não está disponivel',
      buttons: ['Cancelar']
    });
    alert.present();
  }

  userLocalAccount() {
    return localStorage.getItem('eos_activeKeys.');
  }

}
