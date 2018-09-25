import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

}
