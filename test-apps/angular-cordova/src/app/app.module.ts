import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AwesomeCordovaPluginExample } from 'awesome-cordova-plugins-example/ngx';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [AwesomeCordovaPluginExample],
  bootstrap: [AppComponent]
})
export class AppModule { }
