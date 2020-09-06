import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customerreview } from './customerreview';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerreviewService {
url = 'http://localhost:61362/api/CustomerReview'
  constructor(private http:HttpClient) { }
  getReview():Observable<Customerreview[]>{
  return this.http.get<Customerreview[]>(this.url)
  }
}
