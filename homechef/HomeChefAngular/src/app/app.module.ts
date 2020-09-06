import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { OrderService } from './shared/order.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CreateorderComponent } from './createorder/createorder.component';
import { MenueComponent } from './menue/menue.component';
import { CreatetableComponent } from './createtable/createtable.component';
import { CategoryComponent } from './category/category.component';
import { VieworderComponent } from './vieworder/vieworder.component';
import { ViewcustomerComponent } from './viewcustomer/viewcustomer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { OrderamountchartComponent } from './orderamountchart/orderamountchart.component';
import { IncomeamountchartComponent } from './incomeamountchart/incomeamountchart.component';
import { ChartComponent } from './chart/chart.component';
import { MenuedetailschartComponent } from './menuedetailschart/menuedetailschart.component';
import { CustomerreviewComponent } from './customerreview/customerreview.component';
import { DisscussionComponent } from './disscussion/disscussion.component';
import { EarningByItemsComponent } from './earning-by-items/earning-by-items.component';
import { CustomersreportComponent } from './customersreport/customersreport.component';
import {NgxPaginationModule} from 'ngx-pagination';  
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import{UserService} from './user.service';
import {UserGuard} from './user.guard';
import { LoginComponent } from './login/login.component';
import { CustomerregistrationComponent } from './customer/customerregistration/customerregistration.component';
import { LogincustomerComponent } from './logincustomer/logincustomer.component';
import { OrdernowComponent } from './ordernow/ordernow.component';
import { YourorderComponent } from './yourorder/yourorder.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationmodalComponent } from './notificationmodal/notificationmodal.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CreateorderComponent,
    MenueComponent,
    CreatetableComponent,
    CategoryComponent,
    VieworderComponent,
    ViewcustomerComponent,
    OrderamountchartComponent,
    IncomeamountchartComponent,
    ChartComponent,
    MenuedetailschartComponent,
    CustomerreviewComponent,
    DisscussionComponent,
    EarningByItemsComponent,
    CustomersreportComponent,
    LoginComponent,
    CustomerregistrationComponent,
    LogincustomerComponent,
    OrdernowComponent,
    YourorderComponent,
    NotificationComponent,
    NotificationmodalComponent
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule,
    NgxChartsModule ,
    NgxPaginationModule,
    Ng2SearchPipeModule 
  ],
  providers: [ OrderService,AppComponent,UserGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
