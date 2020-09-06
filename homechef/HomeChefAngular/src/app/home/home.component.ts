import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Order } from '../shared/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  orders = [];  
  url = 'http://localhost:61362/api/OrderTbls' ;
  OrderData:number;
  ItemData:number;
   AmountData:number;
   WeekData:number;
  constructor(private http:HttpClient,private loginservice:LoginService,private router:Router) { }

  ngOnInit() {
    this.loginservice.CheckAdminLoggedIn().subscribe(res =>{
     if(res == false){
      this.router.navigate(['login']);

     }
     else{
      this.getTodaysOrder();  
      this.getTodaysItemSold();
      this.getTodaysSellingAmount();
      this.getLastWeekSellingAmount();
      this.getOrder().subscribe(data => this.orders = data);
     }
    });
 
  }
  getTodaysOrder() {
    return this.http.get(this.url+'/GetTodaysOrder').subscribe(  
     data => {  
      this.OrderData = data as number;  
   }
   );
   }
   getTodaysItemSold() {
    return this.http.get(this.url+'/GetTodaysItemSold').subscribe(  
     data => {  
      this.ItemData = data as number;  
   }
   );
   }
   getTodaysSellingAmount() {
    return this.http.get(this.url+'/GetTodaysSellingAmount').subscribe(  
     data => {  
      this.AmountData = data as number;  
   }
   );
   }
   getLastWeekSellingAmount(){
    return this.http.get(this.url+'/GetLastWeekSellingAmount').subscribe(  
      data => {  
       this.WeekData = data as number;  
    }
    ); 
   }
   getOrder():Observable<Order[]>{
     return this.http.get<Order[]>(this.url);
   }
   
 
}
