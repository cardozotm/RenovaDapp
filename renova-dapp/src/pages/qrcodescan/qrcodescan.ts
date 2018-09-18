
import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController,
  AlertController, ModalController, LoadingController } from 'ionic-angular';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { StartPage } from '../start/start';
import { EosapiProvider } from '../../providers/eosapi/eosapi';
import { CallbackTransactionsPage } from '../modals/callback-transactions/callback-transactions';

@IonicPage()
@Component({
  selector: 'page-qrcodescan',
  templateUrl: 'qrcodescan.html',
})
// tslint:disable-next-line:component-class-suffix
export class QrcodescanPage implements OnInit {

  context: any;
  saldo: any;
  qrpin: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public eos: EosapiProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public appCtrl: App) {

    this.saldo = navParams.get('balance');
    this.context = navParams.get('context');
    this.qrpin = navParams.get('qrpin');


  }

  ngVersion = VERSION.full;
  stream: MediaStream;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  videoElement: any;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  ngOnInit(): void {
    // this.play();
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
      const camera = devices[0].deviceId;
      this.onDeviceSelectChange(camera);
      // selects the devices's back camera by default
      for (const device of devices) {
        if (/back|rear|environment/gi.test(device.label)) {
          this.scanner.changeDevice(device);
          this.currentDevice = device;
          break;
        }
      }
    });

    this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    console.debug('Devices: ', cameras);
    this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) {
    console.debug('Result: ', resultString);
    if (this.context === 'transfer') {
      const arry = resultString.split('\\');
      if (arry[0].length === 12 && parseFloat(arry[1]) > 0) {
        // nav push
        this.pushPagar('EnviarPage', arry[0], arry[1], arry[2]);
      } else {
        this.navCtrl.setRoot('CarteiraPage', {
          qrerror: 'error',
        });
      }
      this.qrResultString = resultString;
    }

    if (this.context === 'start') {

      const protectedKey = resultString.toString();
      const pin = this.qrpin.PIN;
      const unProtectedKey: any = this.eos.descrpty(protectedKey, pin);

      if (this.eos.ecc.isValidPrivate(unProtectedKey.__zone_symbol__value)) {
        this.navCtrl.popTo(StartPage).then(resp => {
          this.presentLoading();

          const privateKey = unProtectedKey.__zone_symbol__value;
          const publicKey = this.eos.ecc.privateToPublic(privateKey);

          this.eos.getKeyAccounts(publicKey).then(accounts => {
            const accountName = accounts.account_names[0];
            const store = {};
            store['eosActiveKeys'] = {
              accountName: accountName,
              public: publicKey,
              private: protectedKey
            };

            localStorage.setItem('eos_activeKeys.', JSON.stringify(store));

            this.navCtrl.setRoot('StartPage', {
              qrerror: 'success',
            });
          });

        }).catch(error => {
          this.presentCallback('failure',
          'Verifique se você possui um QR Code válido, se o PIN digitado está correto ou se você está experimentando problemas de conexão',
          '', '');

          console.log(error);
        });

      } else {

        this.presentCallback('failure',
        'Verifique se você possui um QR Code válido, se o PIN digitado está correto ou se você está experimentando problemas de conexão',
        '', '');
      }

    }

  }

  presentLoading() {
    console.log('presentLoading called');
    const loading = this.loadingCtrl.create({
      spinner: 'bubbles',

    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 10000);

  }


  onDeviceSelectChange(selectedValue: string) {
    console.debug('Selection changed: ', selectedValue);
    this.currentDevice = this.scanner.getDeviceById(selectedValue);
  }

  presentCallback(valid, err, newBalance, expense) {
    this.navCtrl.popTo(StartPage).then(resp => {
      const profileModal = this.modalCtrl.create(CallbackTransactionsPage,
        {
          result: valid,
          error: err,
          balance: newBalance,
          expense: expense
        });
      profileModal.present();
    });

  }

  pushPagar(page, account, amount, memo) {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(page, {
      balance: this.saldo,
      from: 'qrcodeweb',
      account: account,
      amount: amount,
      memo: memo
    });

  }

}
