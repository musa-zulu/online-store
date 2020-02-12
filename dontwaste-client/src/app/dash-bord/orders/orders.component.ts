import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Order } from 'src/app/models/order';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  static readonly POLLING_INTERVAL = 1000;
  orders: Order[] = [];
  constructor(private shoppingCartService: ShoppingCartService) {
    this.allOrders();
  }

  allOrders() {
    this.getOrders()
    .subscribe((orders) => {
      this.orders = orders.data;
      console.log();
    });
  }

  private getOrders() {
    return timer(0, OrdersComponent.POLLING_INTERVAL)
    .pipe(switchMap(() => this.shoppingCartService.getOrders()));
  }
}
