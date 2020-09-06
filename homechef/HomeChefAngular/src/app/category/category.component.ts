import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Category } from '../shared/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories = []
 Url = 'http://localhost:61362/api/category'
  constructor(private service:CategoryService,private http:HttpClient) { }

  ngOnInit() {
    this.resetForm();
    this.getCategories().subscribe(data => this.categories = data)
  }
  resetForm(form?:NgForm){
    if (form != null)
    form.form.reset();
  this.service.formData = {
    Id: 0,
    Name: '',
    MenueId:0
  }
  }
 
 onSubmit(form:NgForm){
 

   this.service.PostCategory(form.value).subscribe(
    res=>{ this.resetForm(form)},
    err=>{ console.log('err',err)}
   );
 }
 getCategories():Observable<Category[]>{
   return this.http.get<Category[]>(this.Url);
 }
}
