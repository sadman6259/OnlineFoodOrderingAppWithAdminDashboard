import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';  
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/order';
@Component({
  selector: 'app-menuedetailschart',
  templateUrl: './menuedetailschart.component.html',
  styleUrls: ['./menuedetailschart.component.css']
})
export class MenuedetailschartComponent implements OnInit {
  data: Order[];  
  Menue = [];  
  Quantity = [];  
  chart = [];
  charturl = 'http://localhost:61362/api/OrderTbls/GetMenueDetailsChart'
  constructor(private httpClient: HttpClient) { }
 
  ngOnInit() {
    this.httpClient.get(this.charturl).subscribe((result: Order[]) => {  
      result.forEach(x => {  
        this.Menue.push(x.paymentType);  
        this.Quantity.push(x.quantity);  
      });  
      this  
      this.chart = new Chart('canvas2', {  
        type: 'pie',  
        data: {  
          labels: this.Menue,  
          datasets: [  
            {  
              data: this.Quantity,  
              borderColor: '#3cba9f',  
              backgroundColor: [  
                "#3cb371",  
                "#0000FF",  
                "#9966FF",  
                "#4C4CFF",  
                "#00FFFF",  
                "#f990a7",  
                "#aad2ed",  
                "#FF00FF",  
                "Blue",  
                "Red",  
                "Blue"  
              ],  
              fill: true  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: true  
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
  }  
  }


