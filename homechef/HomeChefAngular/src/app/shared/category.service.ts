import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  Url='http://localhost:61362/api/Category';
  formData:Category;

  constructor(private http:HttpClient) { }
  PostCategory(formData:Category){
   return this.http.post(this.Url,formData);
  }
}
