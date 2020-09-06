import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/shared/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerregistration',
  templateUrl: './customerregistration.component.html',
  styleUrls: ['./customerregistration.component.css']
})
export class CustomerregistrationComponent implements OnInit {

  constructor(private service:CustomerService,private http:HttpClient,private router:Router) { }
  url = 'http://localhost:61362/api/Customer'
  public customer = [];  
  ngOnInit() {
  }
  resetForm(form?:NgForm){
    if (form != null)
    form.form.reset();
  this.service.formData = {
    Id: 0,
    Name: '',
    ContactNo: '',
    Address: '',
    Password:''

  }

  }
  onSubmit(form:NgForm)
  {
    console.log("onsubmit");
  
 
   this.service.postCustomer(form.value).subscribe(
     res=>{ this.resetForm(form);
      this.router.navigate(['cuslogin']);
    },
 
     err=>{ console.log('err',err)},
     
 
 
    );
 
 /*
 else{
   this.service.postMenue(form.value).subscribe(
     res=>{ this.resetForm(form)},
 
     err=>{ console.log('err',err)},
     
 
 
    );
 }
 */
   
   
 
 
  }
}
