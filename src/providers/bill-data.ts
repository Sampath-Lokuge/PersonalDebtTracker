import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import firebase from 'firebase';
import _ from 'lodash';

@Injectable()
export class BillData {
  billList: FirebaseListObservable<any>;
  billDetail: FirebaseObjectObservable<any>;
  userId: string;

  constructor(public af: AngularFire) {
    af.auth.subscribe(auth => {
      if (auth) {
        this.billList = af.database.list(`/userProfile/${auth.uid}/billList`);
        this.userId = auth.uid;
      }
    });
  }

  //get Bill List
  getBillList() {
    return this.billList;
  }

  //get Bill
  getBill(billId: string): FirebaseObjectObservable<any> {
    return this.billDetail = this.af.database.object(`/userProfile/${this.userId}/billList/${billId}`);
  }

  //create Bill
  createBill(name: string, amount: number, borrowedFrom: string, dueDate: string = null, paid: boolean = false) {
    return this.billList.push({ name, amount, borrowedFrom, dueDate, paid });
  }

  //remove Bill
  removeBill(billId: string): any {
    return this.billList.remove(billId);
  }

  //pay Bill
  payBill(billId: string) {
    return this.billList.update(billId, { paid: true });
  }

  //take Bill Photo
  takeBillPhoto(billId: string, imageURL: string) {
    const storageRef = firebase.storage().ref(this.userId);
    return storageRef.child(billId).child('billPicture')
      .putString(imageURL, 'base64', { contentType: 'image/png' })
      .then(pictureSnapshot => {
        this.billList.update(billId, { picture: pictureSnapshot.downloadURL });
      });
  }

  //having UnPaid Items
  havingUnPaidItems(billList): boolean {
    let unpaidList = _.filter(billList, function (b) { return !b.paid; });
    if (unpaidList.length) return true;
  }

  //having Paid Items
  havingPaidItems(billList): boolean {
    let paidList = _.filter(billList, function (b) { return b.paid; });
    if (paidList.length) return true;
  }

}
