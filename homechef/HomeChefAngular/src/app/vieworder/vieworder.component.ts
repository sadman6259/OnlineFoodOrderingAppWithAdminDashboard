import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { HttpClient } from '@angular/common/http';

import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Order } from '../shared/order';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit { 

  constructor(private service:OrderService,private loginservice:LoginService,private router:Router) { }
  public orders = [];  
  url = 'http://localhost:61362/api/OrderTbls'

  ngOnInit() {
    this.loginservice.CheckAdminLoggedIn().subscribe(res =>{
      if(res == false){
       this.router.navigate(['login']);
 
      }
      else{
  this.service.getOrder().subscribe(data =>{this.orders = data , console.log(data)});
      }
   }
    )}
   populateForm(order: Order) {
    this.service.data = Object.assign({}, order);
  }
  
   onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteOrder(id).subscribe(res => {
        this.service.refreshList();
        //this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }
  }
  Delete20order(){
    console.log("dlt20");
    this.service.Delete20order().subscribe(res => {});
  }
 
}
