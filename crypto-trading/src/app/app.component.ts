import {Component} from '@angular/core';
import {GdaxClientService} from '../service/gdax-client.service';
import {BinanceClientService} from '../service/binance-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public data;

  constructor(gdaxClient: GdaxClientService,
              binanceClient: BinanceClientService) {
    gdaxClient.getCoinbaseAccounts().then(res => {
      this.data = res;
    });
  }

}
