import {Injectable} from '@angular/core';
import {ProductInfo} from '../model/gdax-client';

@Injectable()
export class GdaxClientService {
  private gdax;
  private publicClient;
  private privateClient;

  constructor() {
    this.gdax = require('gdax');
    this.publicClient = new this.gdax.PublicClient();

    const auth = new GdaxPrivateClientAuthentication();
    this.privateClient = new this.gdax.AuthenticatedClient(
      auth.authenticator.get(GdaxPrivateClientAPIPermission.VIEW).key,
      auth.authenticator.get(GdaxPrivateClientAPIPermission.VIEW).secret,
      auth.authenticator.get(GdaxPrivateClientAPIPermission.VIEW).passphrase,
      auth.apiURI
    );
  }

  public getProducts(): Promise<ProductInfo[]> {
    return this.publicClient.getProducts();
  }
}

class GdaxPrivateClientAuthentication {
  public apiURI = 'https://api.gdax.com';
  public sandboxURI = 'https://api-public.sandbox.gdax.com';

  public authenticator: Map<GdaxPrivateClientAPIPermission, GdaxPrivateClientAPIKeys>;

  public constructor () {
    const viewKeys = null;

    this.authenticator = new Map().set(GdaxPrivateClientAPIPermission.VIEW, viewKeys);
  }
}

class GdaxPrivateClientAPIKeys {
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
