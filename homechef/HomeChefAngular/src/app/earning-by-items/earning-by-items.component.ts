import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/order';
@Component({
  selector: 'app-earning-by-items',
  templateUrl: './earning-by-items.component.html',
  styleUrls: ['./earning-by-items.component.css']
})
export class EarningByItemsComponent implements OnInit {
  orders = [];  
  url = 'http://localhost:61362/api/OrderTbls' ;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  getOrder():Observable<Order[]>{
    return this.http.get<Order[]>(this.url);
  }
}
