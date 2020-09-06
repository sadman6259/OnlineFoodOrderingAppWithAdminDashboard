import { Injectable, ViewChild } from '@angular/core';
import { Menue } from './menue';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenueService {
formData ={};
Url='http://localhost:61362/api/Menue';

list : Menue[];

  constructor(private http:HttpClient) { }
  
  refreshList(){
    this.http.get(this.Url)
    .toPromise().then(res => this.list = res as Menue[]);
  }
postMenue(formData:Menue){

return this.http.post(this.Url,formData);
}
getItemList(){
  return this.http.get(this.Url).toPromise();
 }
putMenue(formData : Menue){
  console.log("put");
  return this.http.put(this.Url+'/'+formData.Id,formData);
   
 }
deleteMenue(id : number){
  return this.http.delete(this.Url+'/'+id);
 }
/*

*/

}
