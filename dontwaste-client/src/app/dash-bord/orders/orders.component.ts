import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders$;
  constructor(private orderService: OrdersService) {
    this.orders$ = this.getOrders();
  }

  private getOrders() {
    return this.orderService.getOrders();
  }
}
