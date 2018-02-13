import {Injectable} from '@angular/core';
import {ProductInfo} from '../model/gdax-client';

@Injectable()
export class GdaxClientService {
  private gdaxApi;
  private gdaxAccount;
  private publicClient;
  private privateClient;

  constructor() {
    this.gdaxApi = require('gdax');
    this.gdaxAccount = require('../../../../gdax.json');

    this.publicClient = new this.gdaxApi.PublicClient();

    const auth = new GdaxPrivateClientAuthentication(this.gdaxAccount);
    const viewAuth = auth.authenticator.get(GdaxPrivateClientAPIPermission.VIEW);
    this.privateClient = new this.gdaxApi.AuthenticatedClient(viewAuth.key, viewAuth.secret, viewAuth.passphrase, auth.apiURI);
  }

  public getProducts(): Promise<ProductInfo[]> {
    return this.publicClient.getProducts();
  }

  public getCoinbaseAccounts(): Promise<Account[]> {
    return this.privateClient.getCoinbaseAccounts();
  }

}

class GdaxPrivateClientAuthentication {
  public apiURI = 'https://api.gdax.com';
  public sandboxURI = 'https://api-public.sandbox.gdax.com';

  public authenticator: Map<GdaxPrivateClientAPIPermission, GdaxPrivateClientAPIKey> = new Map();

  public constructor (gdaxAccount: any) {
    // read api keys from local json
    gdaxAccount.api_keys.forEach(apiKey => {
      this.authenticator.set((<any>GdaxPrivateClientAPIPermission)[apiKey.permission], new GdaxPrivateClientAPIKey(apiKey.key, apiKey.secret, apiKey.passphrase));
    });
  }
}

class GdaxPrivateClientAPIKey {
  public key: string;
  public secret: string;
  public passphrase: string;

  constructor(key: string, secret: string, passphrase: string) {
    this.key = key;
    this.secret = secret;
    this.passphrase = passphrase;
  }
}

enum GdaxPrivateClientAPIPermission {
  VIEW, TRANSFER, BYPASS_TWO_FACTOR_AUTH, TRADE, MANAGE
}
