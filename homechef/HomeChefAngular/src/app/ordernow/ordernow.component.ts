import { Component, OnInit, Inject } from '@angular/core';

import { OrderService } from '../shared/order.service';
import { NgForm } from '@angular/forms';
import { MenueService } from '../shared/menue.service';
import { Menue } from '../shared/menue';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Order } from '../shared/order';

@Component({
  selector: 'app-ordernow',
  templateUrl: './ordernow.component.html',
  styleUrls: ['./ordernow.component.css']
})
export class OrdernowComponent implements OnInit {
  formData = new Order();
  itemList: Menue[];
  isValid: boolean = true;
  public yourorders = [];  
  //welcomemsg;
  constructor(
    @Inject (OrderService) public data,
    private menueService: MenueService,
    private orderSevice: OrderService,
    private loginservice : LoginService,
    private router:Router) { }

  ngOnInit() {
    this.loginservice.CheckCustomerLoggedIn().subscribe(res =>{
      if(res == false){
       this.router.navigate(['cuslogin']);
 
      }
      else{
    this.menueService.getItemList().then(res => this.itemList = res as Menue[]);
    //this.orderSevice.WelcomeMsg().subscribe(data =>{this.welcomemsg = data , console.log(data)});

    if (this.data.orderItemIndex == null)
      this.formData = {
        Id:this.data.OrderID,
        quantity: 0,
        subtotal: 0,
        totalPrice: 0,
        paymentType: '',
        CustomerId: 0,
        MenueId: 0,
        orderTime:''
      }
    else
      this.formData = Object.assign({}, this.orderSevice.list[this.data.orderItemIndex]);
    }
    
  }
    )}
  Logout(){
    console.log("Logout");
    this.orderSevice.Logout().subscribe(res => {
      console.log(res);
      if(res == true){
        this.router.navigate(['cuslogin']);

      }
    });
  }
  updatePrice(ctrl) {
    console.log("updatePrice"+ctrl);
    if (ctrl.selectedIndex == 0) {
      this.formData.subtotal = 0;
      this.formData.MenueId = 0;
    }
    else {
      this.formData.subtotal = this.itemList[ctrl.selectedIndex - 1].price;
      this.formData.MenueId = this.itemList[ctrl.selectedIndex - 1].id;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.totalPrice = parseFloat((this.formData.quantity * this.formData.subtotal).toFixed(2));
  }
  resetForm(form?:NgForm){
    if (form != null)
    form.form.reset();
  this.orderSevice.data = {
    id: 0,
    quantity: 0,
    subtotal: 0,
    totalPrice: 0,
    paymentType:'',
    CustomerId:0,
    
    orderTime:''

  }
  

  }
  onSubmit(form: NgForm) {
    console.log("submitorder"+form.value);
    console.log(form);
    if(form.value.Id == null){
      form.value.Id = undefined;
    }
    console.log(form);
    if (this.validateForm(form.value)) {
    //  if (this.data.orderItemIndex == null)
    //    this.orderSevice.list.push(form.value);
    //  else
      this.orderSevice.postOrder(form.value).subscribe(
        res=>{ this.resetForm(form)
          this.ngOnInit();

        },
    
        err=>{ console.log('err',err)},
        
    
    
       );
       // this.orderSevice.list[this.data.orderItemIndex] = form.value;
      //this.dialogRef.close();
    }

  }

  validateForm(formData: Order) {
    this.isValid = true;
    if (formData.Id == 0)
      this.isValid = false;
    else if (formData.quantity == 0)
      this.isValid = false;
    return this.isValid;
  }
}

