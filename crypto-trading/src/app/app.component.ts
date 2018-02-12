import {Component} from '@angular/core';
import {GdaxClientService} from '../service/gdax-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gdax;

  constructor(gdaxClient: GdaxClientService) {
  }

}
