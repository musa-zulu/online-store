import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { FoodItem } from 'src/app/models/food-item';

@Component({
  selector: 'app-shopping-card-summary',
  templateUrl: './shopping-card-summary.component.html',
  styleUrls: ['./shopping-card-summary.component.css']
})
export class ShoppingCardSummaryComponent {
  static readonly POLLING_INTERVAL = 1000;
  cartItems: FoodItem[] = [];
  totalPrice;
  shoppingCart = new ShoppingCart();

  constructor() {
    setInterval(() => { this.getTotalPrice(); }, ShoppingCardSummaryComponent.POLLING_INTERVAL);
    setInterval(() => { this.itemsCount(); }, ShoppingCardSummaryComponent.POLLING_INTERVAL);
    setInterval(() => { this.getCart(); }, ShoppingCardSummaryComponent.POLLING_INTERVAL);
    this.cartItems = ShoppingCart.getShoppingCart();
  }

  itemsCount() {
    let count = 0;
    this.cartItems.forEach(el => {
      count += el.quantity;
    });
    return count;
  }

  getCart() {
    this.cartItems = ShoppingCart.getShoppingCart();
    return this.cartItems;
  }

  getTotalPrice() {
   let price = 0;
   this.cartItems.forEach(element => {
      price += element.totalPrice;
    });
   return price;
  }

}
