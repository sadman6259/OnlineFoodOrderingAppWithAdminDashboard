import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../shared/order.service';
import { Chart } from 'chart.js';  
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/order';
@Component({
  selector: 'app-orderamountchart',
  templateUrl: './orderamountchart.component.html',
  styleUrls: ['./orderamountchart.component.css']
})
export class OrderamountchartComponent implements OnInit {
  data: Order[];  
  Date = [];  
  Quantity = [];  
  Linechart = []; 
  chart = [];
  charturl = 'http://localhost:61362/api/OrderTbls/GetItemSoldChart'

  constructor(private httpClient: HttpClient,private service:OrderService) { }

  ngOnInit() {
    
    this.httpClient.get(this.charturl).subscribe((result: Order[]) => {  
      result.forEach(x => {  
        this.Date.push(x.orderTime);  
        this.Quantity.push(x.quantity);  
      });  
      this  
      this.Linechart = new Chart('canvas', {  
        type: 'line',  
        data: {  
          labels: this.Date,  
  
          datasets: [  
            {  
              data: this.Quantity,  
              borderColor: '#3cb371',  
              backgroundColor: "#0000FF",  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: false  
          },  
          scales: {  
            xAxes: [{  
              display: true  
            }],  
            yAxes: [{  
              display: true  
            }],  
          }  
        }  
      });  
    });  
 

  /*this.service.getOrderAmountChart()
.subscribe(res => {
  console.log(res)
})
*/
  }  

  }


