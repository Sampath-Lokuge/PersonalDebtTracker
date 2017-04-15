import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthData {
  fireAuth: any;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      if (user) { this.fireAuth = user.auth; }
    });
  }

  //get User
  getUser(): any {
    return this.fireAuth;
  }

  //login User
  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({
      email: newEmail,
      password: newPassword
    });
  }

  //anonymous Login
  anonymousLogin(): any {
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    });
  }

  //link Account
  linkAccount(email: string, password: string): any {
    const userProfile = firebase.database().ref('/userProfile');
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return firebase.auth().currentUser.link(credential).then(user => {
      userProfile.child(user.uid).update({ email: email });
    }, error => {
      console.log("There was an error linking the account", error);
    });
  }

  //reset Password
  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  //logout User
  logoutUser(): any {
    return this.af.auth.logout();
  }

}