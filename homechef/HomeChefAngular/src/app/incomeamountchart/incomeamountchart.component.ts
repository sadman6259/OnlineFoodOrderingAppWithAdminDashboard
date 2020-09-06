import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';  
import { HttpClient } from '@angular/common/http'; 
import { Order } from '../shared/order';
@Component({
  selector: 'app-incomeamountchart',
  templateUrl: './incomeamountchart.component.html',
  styleUrls: ['./incomeamountchart.component.css']
})
export class IncomeamountchartComponent implements OnInit {
  data: Order[];  
  charturl = 'http://localhost:61362/api/OrderTbls/GetSellingAmountChart'
  Date = [];  
  Price = [];  
  barchart = [];
  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.http.get(this.charturl).subscribe((result: Order[]) => {  
      result.forEach(x => {  
        this.Date.push(x.orderTime);  
        this.Price.push(x.totalPrice);  
      });  
      this  
      this.barchart = new Chart('canvas1', {  
        type: 'bar',  
        data: {  
          labels: this.Date,  
          datasets: [  
            {  
              data: this.Price,  
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
  }  
  }


