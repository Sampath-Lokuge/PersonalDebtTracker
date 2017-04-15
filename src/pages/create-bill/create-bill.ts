import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { BillData } from '../../providers/bill-data';

@Component({
  selector: 'page-create-bill',
  templateUrl: 'create-bill.html'
})
export class CreateBillPage {
  public newBillForm;

  constructor(public navCtrl: NavController, public billData: BillData, public formBuilder: FormBuilder) {

    this.newBillForm = formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      borrowedFrom: [''],
      dueDate: ['', Validators.required]
    });
  }

  //create Bill
  createBill() {
    if (!this.newBillForm.valid) {
      console.log(this.newBillForm.value);
    } else {
      this.billData.createBill(this.newBillForm.value.name, this.newBillForm.value.amount, this.newBillForm.value.borrowedFrom, this.newBillForm.value.dueDate)
        .then(() => {
          this.navCtrl.pop();
        }, error => {
          console.log(error);
        });
    }
  }

}
