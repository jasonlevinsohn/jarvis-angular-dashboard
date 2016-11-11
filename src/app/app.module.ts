import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';
import { FarmgateComponent } from './farmgate/farmgate.component';
import { AngularFireModule } from 'angularfire2';

import { WeatherService } from './shared/services/index';
import { WeatherComponent } from './weather/weather.component';


export const firebaseConfig = {
    apiKey: 'AIzaSyDVgfyNh_wPGVAMTZ3h0Np0QvR8kbqzQ0Y',
    authDomain: 'l3-controller.firebaseapp.com',
    databaseURL: 'https://l3-controller.firebaseio.com',
    storageBucket: 'l3-controller.appspot.com',
    messagingSenderId: '171670137242'
};

@NgModule({
  declarations: [
    AppComponent,
    FarmgateComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
