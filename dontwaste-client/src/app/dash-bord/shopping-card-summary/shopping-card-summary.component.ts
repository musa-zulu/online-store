import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { FoodItem } from 'src/app/models/food-item';

@Component({
  selector: 'app-shopping-card-summary',
  templateUrl: './shopping-card-summary.component.html',
  styleUrls: ['./shopping-card-summary.component.css']
})
export class ShoppingCardSummaryComponent {
  cart: FoodItem[] = [];
  totalPrice;
  shoppingCart = new ShoppingCart();

  constructor() {
    setInterval(() => { this.getTotalPrice(); }, 1000);
    setInterval(() => { this.itemsCount(); }, 1000);
    setInterval(() => { this.getCart(); }, 1000);
    this.cart = ShoppingCart.getShoppingCart();
  }

  itemsCount() {
    let count = 0;
    this.cart.forEach(el => {
      count += el.quantity;
    });
    return count;
  }

  getCart() {
    this.cart = ShoppingCart.getShoppingCart();
    return this.cart;
  }

  getTotalPrice() {
   let price = 0;
   this.cart.forEach(element => {
      price += element.totalPrice;
    });
   return price;
  }

}
