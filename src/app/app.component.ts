import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { AngularFire } from 'angularfire2';
import { LandingPage } from '../pages/landing/landing';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, af: AngularFire) {
    const authListener = af.auth.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        authListener.unsubscribe();
      } else {
        this.rootPage = LandingPage;
        authListener.unsubscribe();
      }
    });

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
