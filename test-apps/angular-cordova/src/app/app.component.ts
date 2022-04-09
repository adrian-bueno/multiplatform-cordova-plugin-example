import { Component } from '@angular/core';
import { AwesomeCordovaPluginExample } from 'awesome-cordova-plugins-example/ngx'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private awesomeCordovaPluginExample: AwesomeCordovaPluginExample) {}

  greeting(name?: string) {
    this.awesomeCordovaPluginExample.greeting(name)
      .then(res => console.log(res))
      .catch(error => console.error(error));
  }

  countdown(seconds: number) {
    this.awesomeCordovaPluginExample.countdownTimer(seconds)
      .subscribe(sec => console.log(sec));
  }

  writeFile(fileName: string, text: string) {
    this.awesomeCordovaPluginExample.writeFile(fileName, text)
      .then(res => console.log(res))
      .catch(error => console.error(error));
  }

  bitcoinCurrentPrice() {
    this.awesomeCordovaPluginExample.bitcoinCurrentPrice()
      .then(res => console.log(res))
      .catch(error => console.error(error));
  }

}
