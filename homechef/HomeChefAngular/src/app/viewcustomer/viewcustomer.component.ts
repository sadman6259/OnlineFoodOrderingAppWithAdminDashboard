import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../shared/customer';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {
       customers = [] ;
  constructor(private service:CustomerService,private loginservice:LoginService,private router:Router) { }

  ngOnInit() {
    this.loginservice.CheckAdminLoggedIn().subscribe(res =>{
      if(res == false){
       this.router.navigate(['login']);
 
      }
      else{
        this.service.getCustomer().subscribe(data =>  this.customers = data);

      }
    })

  }
  populateForm(customer: Customer) {
    this.service.formData = Object.assign({}, customer);
  }
  
   onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteCustomer(id).subscribe(res => {
        this.service.getCustomer().subscribe(data =>  this.customers = data);
        //this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }
  }
}
