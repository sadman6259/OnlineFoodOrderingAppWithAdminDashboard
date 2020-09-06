import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.css']
})
export class CreateorderComponent implements OnInit {

  constructor(private service:OrderService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.data = {
      Id: 0,
     quantity:0,
      subtotal: 0,
      totalPrice:0,
      paymentType: '',
      CustomerId:0,
      MenueId:0,
      orderTime:''

    }
  }
OnSubmit(form:NgForm){
  this.service.postOrder(form.value).subscribe(
result =>{ this.resetForm(form)},
error => {console.log('err',error)}

  );
}

}
