import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders$;
  constructor(private shoppingCartService: ShoppingCartService) {
    this.orders$ = this.getOrders();
  }

  private getOrders() {
    //return this.shoppingCartService.getCart();
  }
}
