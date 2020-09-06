import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = 'http://localhost:61362/api/Customer'
  formData = {};
  list : Customer[];

  constructor(private http:HttpClient) { }
 
  getCustomer():Observable<Customer[]>{

    return this.http.get<Customer[]>(this.url);
    
    
    }
    refreshList(){
      this.http.get(this.url)
      .toPromise().then(res => this.list = res as Customer[]);
    }
    postCustomer(formData : Customer){
      console.log("postCustomer");
      return this.http.post(this.url,formData);
       
     }
     loginCustomer(formData : Customer){
      console.log("loginCustomer");
      return this.http.post('http://localhost:61362/api/Customer/CustomerLogin',formData);
       
     }
    deleteCustomer(id : number){
      return this.http.delete(this.url+'/'+id);
     }
}
