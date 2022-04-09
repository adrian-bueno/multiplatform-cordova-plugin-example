import { Injectable } from '@angular/core';
import { Cordova, Plugin, AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core';
import { Observable } from 'rxjs';


// We will define first two interfaces for
// the Bitcoin current price response.
// I don't know at this moment if we
// can define this interfaces in different files.
// I wasn't completely successful when I tried to do it.

export interface BPI {
  code: string;
  description: string;
  rate: string;
  rate_float: number;
  symbol: string;
}

export interface BitcoinCurrentPriceResponse {
  bpi: {
    EUR: BPI;
    GBP: BPI;
    USD: BPI;
  },
  chartName: string;
  disclaimer: string;
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  }
}


// We need two decorators @Plugin and @Injectable.
//
// For the @Plugin properties, remember what we wrote
// in our plugin's plugin.xml file:
//
// <!-- www -->
// <js-module name="CordovaPluginExample" src="www/CordovaPluginExample.js">
//   <clobbers target="cordova.plugins.CordovaPluginExample" />
// </js-module>
//
// pluginName == js-module.name
// pluginRef == clobbers.target

@Plugin({
  pluginName: 'CordovaPluginExample',
  plugin: 'cordova-plugin-example',
  pluginRef: 'cordova.plugins.CordovaPluginExample',
  repo: 'https://github.com/adrian-bueno/multiplatform-cordova-plugin-example',
  platforms: ['Android', 'iOS', 'Electron']
})
@Injectable()
export class AwesomeCordovaPluginExample extends AwesomeCordovaNativePlugin {

  // For every method, use the @Cordova decorator.
  // Since in our Cordova plugin JavaScript file (www/CordovaPluginExample.js)
  // we defined callback functions before parameters,
  // now we have to declare 'callbackOrder' as 'reverse'.

  @Cordova({
    callbackOrder: 'reverse'
  })
  greeting(name?: string): Promise<string> { return null; }

  // If a method can return multiple values over time,
  // declare the property 'observable' as 'true'.

  @Cordova({
    observable: true,
    callbackOrder: 'reverse'
  })
  countdownTimer(seconds?: number): Observable<number> { return null; }

  // We don't have to add any logic to the methods, just return null.

  @Cordova({
    callbackOrder: 'reverse'
  })
  writeFile(fileName: string, text: string): Promise<string> { return null; }

  @Cordova({
    callbackOrder: 'reverse'
  })
  bitcoinCurrentPrice(): Promise<BitcoinCurrentPriceResponse> { return null; }

}

// Check more `@Plugin` and `@Cordova` options (and other details)
// in the official developer documentation:
// https://github.com/danielsogl/awesome-cordova-plugins/blob/master/DEVELOPER.md
