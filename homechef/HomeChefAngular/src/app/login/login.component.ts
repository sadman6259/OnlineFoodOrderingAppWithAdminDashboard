import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service';
import {AlertService} from '../alert.service';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router:Router,private user:UserService,private alertService: AlertService,private loginservice :LoginService) { }
 public msg ="Username Or Password is Incorrect";
 message:string;
  ngOnInit() {
  }
  loginUser(e) {
  	e.preventDefault();
  	console.log(e);
  	var username = e.target.elements[0].value;
  	var password = e.target.elements[1].value;
  	
  	if(username == 'admin' && password == 'admin') {
      this.loginservice.savelogininfo().subscribe(
        res=>{ console.log('res',res)},

        err=>{ console.log('err',err)},
      );
      this.user.setUserLoggedIn();
  		this.router.navigate(['home']);
    }
    else{
      //this.alertService.error("Wrong Username or Password");
     //alert(this.msg);
this.message ="Username Or Password is Incorrect";
    }
}
}
