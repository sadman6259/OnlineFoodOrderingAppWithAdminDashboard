import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification123 } from '../shared/notification';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public notify = [];  

  constructor(private http:HttpClient) { }

  ngOnInit() {
     this.getnotification().subscribe(res =>{
      this.notify = res
       })
      
  }

 getnotification():Observable<Notification123[]>{
  return this.http.get<Notification123[]>('http://localhost:61362/api/NotificationTbls');
 }

}
