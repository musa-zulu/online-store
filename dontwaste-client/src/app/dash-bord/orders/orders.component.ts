import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [];
  constructor(private shoppingCartService: ShoppingCartService) {
    this.getOrders()
    .subscribe((orders) => {
      this.orders = orders.data;
      console.log();
    });
  }

  private getOrders() {
    return this.shoppingCartService.getOrders();
  }
}
