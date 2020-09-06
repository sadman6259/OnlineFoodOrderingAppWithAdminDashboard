import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
numbers : number;
notificationcount:number;
  constructor(private appp:AppComponent,private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.GetUnreadNotification();
    this.numbers = this.appp.cc;
  }
  AdminLogout(){
return this.http.get('http://localhost:61362/api/Customer/AdminLogout').subscribe(res =>{
 if(res == true){
this.router.navigate(['login']);
 }
});
  }
  GetUnreadNotification() {
    return this.http.get('http://localhost:61362/api/OrderTbls/GetUnreadNotification').subscribe(  
     data => {  
      this.notificationcount = data as number;  
   }
   );
   }
   SetUnreadNotification() {
    return this.http.get('http://localhost:61362/api/OrderTbls/SetUnreadNotification').subscribe(  
     data => {  
      this.notificationcount = data as number;  
   }
   );
   }
}
