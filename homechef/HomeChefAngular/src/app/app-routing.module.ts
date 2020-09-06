import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateorderComponent } from './createorder/createorder.component';
import { CreatetableComponent } from './createtable/createtable.component';
import { HomeComponent } from './home/home.component';
import { ChartComponent } from './chart/chart.component';
import { DisscussionComponent } from './disscussion/disscussion.component';
import { EarningByItemsComponent } from './earning-by-items/earning-by-items.component';
import { CustomersreportComponent } from './customersreport/customersreport.component';
import{UserService} from './user.service';
import {UserGuard} from './user.guard';
import { LoginComponent } from './login/login.component';
import { CustomerregistrationComponent } from './customer/customerregistration/customerregistration.component';
import { LogincustomerComponent } from './logincustomer/logincustomer.component';
import { OrdernowComponent } from './ordernow/ordernow.component';
import { YourorderComponent } from './yourorder/yourorder.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationmodalComponent } from './notificationmodal/notificationmodal.component';

 
const routes: Routes = [
  {path: 'createorder',component: CreateorderComponent},
  {path: 'createtbl', component: CreatetableComponent},
  {path: 'chart',component: ChartComponent},
   {path: 'discussion', component: DisscussionComponent},
  {path: 'home', component: HomeComponent},
  {path: 'earningbyitems',component: EarningByItemsComponent},
  {path: 'customersreport',component: CustomersreportComponent},
  {
    path: 'login',
    
    component: LoginComponent
  },
  {path: '', redirectTo:'/login',pathMatch:'full'},
  {path: 'registration',component: CustomerregistrationComponent},
  {path: 'cuslogin',component: LogincustomerComponent},
  {path: 'ordernow', component: OrdernowComponent},
  {path:'yourorder', component:YourorderComponent},
  {path:'notification', component:NotificationComponent},
  {path:'notificationmodal', component:NotificationmodalComponent},









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
