import { OrderService, OrderDetails } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.scss'],
})
export class FinishOrderComponent implements OnInit {
  details: OrderDetails | undefined;
  orderConfirmed = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    if (this.orderService.orderDetails) {
      this.orderConfirmed = true;
      this.details = this.orderService.orderDetails;
    }
  }
}
