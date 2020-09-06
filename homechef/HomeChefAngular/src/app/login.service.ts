import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  formdata = {};

  constructor(private http:HttpClient) { }
  
savelogininfo(){
  return this.http.get('http://localhost:61362/api/Customer/SaveLoginInfo');
  
}
CheckAdminLoggedIn(){
  return this.http.get('http://localhost:61362/api/Customer/CheckAdminLoggedIn');
  
}
CheckCustomerLoggedIn(){
  return this.http.get('http://localhost:61362/api/Customer/CheckCustomerLoggedIn');
  
}
}
