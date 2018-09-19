import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import * as EOSJS from '../../../node_modules/eosjs/lib/index.js';
import * as ecc from 'eosjs-ecc';

import * as CryptoJS from 'crypto-js';


@Injectable()
export class EosapiProvider {
  eosio: any;
  tokens: any;
  public ecc: any;
  format: any;
  ready: boolean;
  status = new Subject<Boolean>();
  txh: any[];
  actionHistory: any[];

  baseConfig = {
    keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'], // WIF string or array of keys..
    httpEndpoint: 'http://dev.bluchain.tech:8888',
    expireInSeconds: 60,
    broadcast: false,
    debug: true,
    sign: true,
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
  };
  basePublicKey = '';
  auth = false;
  constitution = '';
  txCheckQueue = [];
  txMonitorInterval = null;

  public accounts = new BehaviorSubject<any>({});
  public online = new BehaviorSubject<boolean>(false);
  public chainID: string;
  public eos: any;

  constructor() {
    this.ecc = EOSJS.modules['ecc'];
    this.format = EOSJS.modules['format'];
    this.eos = EOSJS(this.baseConfig);

  }

  // ***  Bluchain Coding  *** //

  // Retorna o balance de uma account/currency para um contrato especifico
  getBalance(contract, account, symbol) {
    return new Promise((resolve, reject) => {
      this.eos.getCurrencyBalance(contract, account, symbol).then(res => {
        resolve(res)
          , (err) => {
            reject(err);
          };
      });
    });
  }

  // Executa a transferência de uma currecy de uma account para outra account para o
  async transfer(from, to, quatity, memo) {
    await this.eos.transaction('blucoin', blucoin => {
      blucoin.transfer(from, to, quatity, memo);
      // Returning a promise is optional (but handled as expected)
    });
  }


  // Cria uma account na blockchain
  createAccount(name, pubkeyOwner, pubkeyActive) {
    return new Promise((resolve, reject) => {
      this.eos.transaction(tr => {
        tr.newaccount({
          creator: 'eosio',
          name: name,
          owner: pubkeyOwner,
          active: pubkeyActive
        });
        resolve('success');
      }, (err) => {
        reject(err);
      });
    });
  }


  createAccountForUser(name, password, gov_id, user_data, type, status) {
    return new Promise((resolve, reject) => {
      const accountName = name;
      let ownerPrivateKey;
      let ownerPublicKey;
      let activePrivateKey;
      let activePublicKey;
      const secret = password;

      // Gerar dois pares de chaves para o Owner/Active
      ecc.randomKey().then(resp => {
        ownerPrivateKey = resp; // wif
        ownerPublicKey = ecc.privateToPublic(resp); // EOSKey
      });

      ecc.randomKey().then(resp => {
        activePrivateKey = resp; // wif
        activePublicKey = ecc.privateToPublic(resp); // EOSKey
      })
        .then((resp: any) => {
          this.createAccount(accountName, ownerPublicKey, activePublicKey).then(resp => {

            if (resp === 'success') {

              const accounts: any = {
                'accountName': accountName,
                'ownerPublicKey': ownerPublicKey,
                'activePublicKey': activePublicKey,
                'ownerPrivateKey': ownerPrivateKey,
                'activePrivateKey': activePrivateKey
              };

              const ciphertext = CryptoJS.AES.encrypt(activePrivateKey, secret);
              const store = {};
              store['eosActiveKeys'] = {
                accountName: accountName,
                public: activePublicKey,
                private: ciphertext.toString(),
                role: type
              };
  
              localStorage.setItem('eos_activeKeys.', JSON.stringify(store));
              const encriptedKey = JSON.parse(localStorage.getItem('eos_activeKeys.'));
  
              const cipherUserData = CryptoJS.AES.encrypt(JSON.stringify(user_data), activePublicKey).toString();
              const gov_idMd5 = CryptoJS.MD5(gov_id).toString();

              this.reloadInstance(activePrivateKey);

              setTimeout(() => {
                this.addUser(accountName, gov_idMd5, cipherUserData, type, status)
              }, 1000);
            }
          })
        })
      resolve('success')
        // tslint:disable-next-line:no-unused-expression
        , (err) => {
          console.log(err);
          reject(err);
        };
    });
  }

  addUser(account, gov_id, user_data, type, status) {
    this.eos.transaction('renovasys', renovasys => {
      const options = {
        authorization: [{
          actor: account,
          permission: 'active'
        }]
      };
      renovasys.adduser(account, gov_id, user_data, type, status, options);
      // Returning a promise is optional (but handled as expected)
    }).then(r => {
     // this.clearInstance();
    })
      .catch(err => {
        console.log(err);
      })

  }

  async getBlucoinActions(scope, actor) {
    const sent = [];
    const received = [];
    const history = {
      sent: sent,
      received: received
    };
    // Atualmente ,busca as últimas 1 milhão de transações, refatorar para buscar sempre todas as transações.
    const actions = (await this.eos.getActions(scope, 0, 1000000)).actions;
    console.log(actions);
    actions.forEach(e => {
      if (e.action_trace.act.data.from === actor) {
        sent.push(e);
      }
      if (e.action_trace.act.data.to === actor) {
        received.push(e);
      }
    });
    console.log(history);
    return history;
  }

  async getClientActions() {
    // Atualmente ,busca as últimas 1 milhão de transações, refatorar para buscar sempre todas as transações.
    const actions = (await this.eos.getActions('bluclient', 0, 1000000)).actions;
    console.log(actions);
    return actions;
  }

  // Faz o reload da instancia do EOS quando o usurio libera a chave privada para executar uma action
  reloadInstance(privkey) {
    this.baseConfig.keyProvider.push(privkey);
    console.log(this.baseConfig.keyProvider);
    this.eos = EOSJS(this.baseConfig);
  }

  // Faz a limpeza da chave privada utilizada pelo usuário após a execução de uma action
   clearInstance() {
    this.baseConfig.keyProvider = ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'];
    console.log(this.baseConfig.keyProvider);
    this.eos = EOSJS(this.baseConfig);
  }

  async descrpty(protectedKey, pin) {
    const decriptedKey = CryptoJS.AES.decrypt(protectedKey, pin);
    const plaintext = decriptedKey.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }


  async checkAccountName(name) {
    return this.format['encodeName'](name);
  }

  async getAccountInfo(name) {
    return this.eos['getAccount'](name);
  }

  async getKeyAccounts(pubkey) {
    return this.eos.getKeyAccounts(pubkey);
  }

}