import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})

export class LandingPage {

  constructor(public navCtrl: NavController, public authData: AuthData, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  //go To Login
  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  //go To Bill List
  goToBillList() {
    const loading = this.loadingCtrl.create();
    loading.present();

    this.authData.anonymousLogin().then(() => {
      loading.dismiss().then(() => {
        this.navCtrl.setRoot(HomePage);
      });
    });
  }

}
