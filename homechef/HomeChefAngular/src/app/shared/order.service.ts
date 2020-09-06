import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  url = 'http://localhost:61362/api/OrderTbls'
  charturl = 'http://localhost:61362/api/OrderTbls/GetItemSoldChart'
  deleteurl = 'http://localhost:61362/api/OrderTbls/DeleteOrder'

  data = {};
list:Order[];
  constructor(private http:HttpClient) { }
  /*  getTodaysOrder() {
 return this.http.get(this.url+'/GetTodaysOrder').subscribe(  
  data => {  
   this.formData = data as number;  
}
);
}*/
refreshList(){
  this.http.get(this.url)
  .toPromise().then(res => this.list = res as Order[]);
}
deleteOrder(id : number){
  return this.http.delete(this.url+'/'+id);
 }
 Delete20order(){
  console.log("dlt201");
   return this.http.delete(this.deleteurl);
 }
postOrder(data:Order){
  return this.http.post(this.url,data);
}
WelcomeMsg(){
  return this.http.get('http://localhost:61362/api/Customer/WelcomeMessage');

}
Logout(){
  return this.http.get('http://localhost:61362/api/Customer/Logout');
}
putOrder(data:Order){
  return this.http.put(this.url,data);
}
getOrder():Observable<Order[]>{
  return this.http.get<Order[]>(this.url);
}
getyourOrder():Observable<Order[]>{
  return this.http.get<Order[]>('http://localhost:61362/api/OrderTbls/getyourOrder');
}
getOrderAmountChart():Observable<Order[]>{
  return this.http.get<Order[]>(this.charturl);
}
}