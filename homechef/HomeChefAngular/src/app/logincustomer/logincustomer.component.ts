import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../shared/customer';
import { CustomerService } from '../shared/customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-logincustomer',
  templateUrl: './logincustomer.component.html',
  styleUrls: ['./logincustomer.component.css']
})
export class LogincustomerComponent implements OnInit {

  constructor(private router:Router,private user:UserService,private alertService: AlertService,private http:HttpClient,private service:CustomerService) { }
  public msg ="Username Or Password is Incorrect";
 message:string;
 public customer = [] ;  
 result : string;
cus = {} ;
  ngOnInit() {
  }
  loginUser(form:NgForm) {
  	//form.preventDefault();
    console.log(form);
    console.log("aaa");
    /*
  	var username = form.target.elements[0].value;
    var password = form.target.elements[1].value;
    */
    
    this.service.loginCustomer(form.value).subscribe(
      res=>{ 
        console.log(res);
        if(res == true){
          this.user.setUserLoggedIn();

          this.router.navigate(['ordernow']);

        }
        else{
          this.message ="Username Or Password is Incorrect";

        }

      },
     
  
      err=>{ console.log('err',err)},
      
  
  
     );

     
     /*
     console.log(this.result+'dipto');
     if(this.result == "true"){


     }
     else{

     }
     */
  
  /*	if(username == 'admin' && password == 'admin') {
      this.user.setUserLoggedIn();
  		this.router.navigate(['home']);
    }
    else{
      //this.alertService.error("Wrong Username or Password");
     //alert(this.msg);
this.message ="Username Or Password is Incorrect";
    }
    */
 
}

 //login = this.http.get('http://localhost:61362/api/Customer/CustomerLogin');
  
  
}
