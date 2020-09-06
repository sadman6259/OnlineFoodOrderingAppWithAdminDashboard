import { Component, OnInit, ViewChild } from '@angular/core';
import { MenueService } from '../shared/menue.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Menue } from '../shared/menue';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.css']
})
export class MenueComponent implements OnInit {
  constructor(private service:MenueService,private http:HttpClient,private loginservice:LoginService,private router:Router) { }
  url = 'http://localhost:61362/api/Menue'
  public menues = [];  

  ngOnInit() {
    this.loginservice.CheckAdminLoggedIn().subscribe(res =>{
      if(res == false){
       this.router.navigate(['login']);
 
      }
      else{
        this.resetForm();
        this.getMenue().subscribe(data =>  this.menues = data);
      }

    
     // this.service.refreshList();
   

  }
    )}
  resetForm(form?:NgForm){
    if (form != null)
    form.form.reset();
  this.service.formData = {
    id: 0,
    name: '',
    price: 0,
    details: ''

  }
  this.getMenue().subscribe(data =>  this.menues = data);

  }
  generateform(menue: Menue){
    
  this.service.formData = {
    id: menue.id,
    name: menue.name,
    price: menue.price,
    details: menue.details

  }
  //this.getMenue().subscribe(data =>  this.menues = data);

  }
    getMenue():Observable<Menue[]>{

    return this.http.get<Menue[]>(this.url);
    
    
    }
 onSubmit(form:NgForm)
 {
   console.log("onsubmit");
 
if(form.value.Id > 0) {
  this.service.putMenue(form.value).subscribe(
    res=>{
      this.ngOnInit();

    },

    err=>{ console.log('err',err)},
    


   );
}
else{
  this.service.postMenue(form.value).subscribe(
    res=>{ 
      this.ngOnInit();

    },

    err=>{ console.log('err',err)},
    


   );
}
  
  


 }
 populateForm(m: Menue) 
 {
   console.log("populateForm");
  this.service.formData = Object.assign({}, m);
}

 onDelete(id: number) {
  if (confirm('Are you sure to delete this record?')) {
    this.service.deleteMenue(id).subscribe(res => {
      //this.service.refreshList();
      this.getMenue().subscribe(data =>  this.menues = data);

      //this.toastr.warning('Deleted successfully', 'EMP. Register');
    });
  }
}
}
