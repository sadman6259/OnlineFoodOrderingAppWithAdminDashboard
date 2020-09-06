import { Component, OnInit } from '@angular/core';
import { CustomerreviewService } from '../shared/customerreview.service';

@Component({
  selector: 'app-customerreview',
  templateUrl: './customerreview.component.html',
  styleUrls: ['./customerreview.component.css']
})
export class CustomerreviewComponent implements OnInit {
  public customerreview =[]

  constructor(private service:CustomerreviewService) { 

  }

  ngOnInit() {
    this.service.getReview().subscribe(data => {this.customerreview = data, console.log(data)  })
  }

}
