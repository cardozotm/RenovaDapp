import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Generated class for the ListaOfertasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-ofertas',
  templateUrl: 'lista-ofertas.html',
})
export class ListaOfertasPage {

  offerList
  public accountName: string;
  public hasAccount = new BehaviorSubject<boolean>(this.userHasAccount());
  private localAccount: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.offerList = [
      {
        title: "Bolsa Feminina Azul",
        merchant: "Loja da Tia Joana",
        thumbnail: "bolsa.jpg",
        discount: "20%",
        value: "50",
      },
      {
        title: "Amaciante Ariel 1L",
        merchant: "Mercado do Bairro",
        thumbnail: "amaciante.jpg",
        discount: "100%",
        value: "120",
      },
      {
        title: "Coca-cola 2L",
        merchant: "Padaria Pão Doce",
        thumbnail: "coca.jpg",
        discount: "75%",
        value: "80",
      },
      {
        title: "Amaciante Ariel 1L",
        merchant: "Mercado do Bairro",
        thumbnail: "amaciante.jpg",
        discount: "100%",
        value: "120",
      },
      {
        title: "Bolsa Feminina Azul",
        merchant: "Loja da Tia Joana",
        thumbnail: "bolsa.jpg",
        discount: "20%",
        value: "50",
      },
      {
        title: "Coca-cola 2L",
        merchant: "Padaria Pão Doce",
        thumbnail: "coca.jpg",
        discount: "75%",
        value: "80",
      },
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaOfertasPage');
  }



  // Eos Functions

  // Verifica se o usuário possui um par de chaves armazenado no storageLocation e retorna false ou true
  userHasAccount(): boolean {
    return !!localStorage.getItem('eos_activeKeys.');
  }

  // Instancia uma account salva no storageLocation para ser usada pela aplicação
  setLocalAccount() {
    if (this.userHasAccount() === true) {
      this.localAccount = JSON.parse(this.userLocalAccount());
      this.accountName = this.localAccount.eosActiveKeys.accountName;
    }
  }

  // Retorna o conteúdo das chaves armazenadas no storageLocation
  userLocalAccount() {
    return localStorage.getItem('eos_activeKeys.');
  }

}
