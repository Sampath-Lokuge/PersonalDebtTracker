import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: any;
  loading: any;

  constructor(public navCtrl: NavController, public authData: AuthData, public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  //sign up User
  signupUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.authData.linkAccount(this.signupForm.value.email, this.signupForm.value.password).then(() => {
        this.loading.dismiss().then(() => { this.navCtrl.pop(); });
      }, (error) => {
        this.loading.dismiss().then(() => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
    }
  }
}
