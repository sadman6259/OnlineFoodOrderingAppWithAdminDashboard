import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yourorder',
  templateUrl: './yourorder.component.html',
  styleUrls: ['./yourorder.component.css']
})
export class YourorderComponent implements OnInit {
  public yourorders = [];  
  //welcomemsg : string;

  constructor(private orderSevice: OrderService,private loginservice :LoginService,private router:Router) { }

  ngOnInit() {
    this.loginservice.CheckCustomerLoggedIn().subscribe(res =>{
      if(res == false){
       this.router.navigate(['cuslogin']);
 
      }
      else{
        this.orderSevice.getyourOrder().subscribe(data =>{this.yourorders = data , console.log(data)});
        //this.orderSevice.WelcomeMsg().subscribe(data =>{this.welcomemsg = data as string , console.log(data)});
      }
  


  }
    )
}
Logout(){
  console.log("Logout");
  this.orderSevice.Logout().subscribe(res => {
    console.log(res);
    if(res == true){
      this.router.navigate(['cuslogin']);

    }
  });
}
}
