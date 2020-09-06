import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification123 } from '../shared/notification';

@Component({
  selector: 'app-notificationmodal',
  templateUrl: './notificationmodal.component.html',
  styleUrls: ['./notificationmodal.component.css']
})
export class NotificationmodalComponent implements OnInit {
  public top4notify = [];  

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.gettop4notification().subscribe(res =>{
      this.top4notify = res
       })
  }
  gettop4notification():Observable<Notification123[]>{
    return this.http.get<Notification123[]>('http://localhost:61362/api/NotificationTbls/GetTop4NotificationTbl');
   }
}
