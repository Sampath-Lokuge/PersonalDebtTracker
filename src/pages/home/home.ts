import { Component } from '@angular/core';

import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { BillData } from '../../providers/bill-data';
import { CreateBillPage } from '../create-bill/create-bill';
import { BillDetailPage } from '../bill-detail/bill-detail';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  billList: any;
  havingUnPaidItems: boolean = false;
  isAnonymous: boolean = true;
  havingPaidItems: boolean = false;

  constructor(public navCtrl: NavController, public billData: BillData, public actionCtrl: ActionSheetController,
    public platform: Platform, public authData: AuthData) {

    this.billData.getBillList().subscribe(billListSnap => {
      this.billList = billListSnap;
      this.checkAvailabilityOfPaidAndUnpaidItems(this.billList);
    });
  }

  ionViewDidEnter(): void {
    this.isAnonymous = this.authData.getUser().isAnonymous;
  }

  //create Bill
  createBill(): void {
    this.navCtrl.push(CreateBillPage);
  }

  //go To Paid Bill
  goToPaidBill(billId: string): void {
    this.navCtrl.push(BillDetailPage, { billId: billId });
  }

  //more Bill Options
  moreBillOptions(billId) {
    let action = this.actionCtrl.create({
      title: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.billData.removeBill(billId);
            this.checkAvailabilityOfPaidAndUnpaidItems(this.billList);
          }
        },
        {
          text: 'Mark as Paid',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.billData.payBill(billId);
            this.checkAvailabilityOfPaidAndUnpaidItems(this.billList);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    action.present();
  }

  //log Out
  logOut() {
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  //check Availability Of Paid And Unpaid Items
  checkAvailabilityOfPaidAndUnpaidItems(billList): void {
    this.havingUnPaidItems = this.billData.havingUnPaidItems(billList);
    this.havingPaidItems = this.billData.havingPaidItems(billList);
  }

}
