import { Component, OnInit, Input } from '@angular/core';
import { FoodItem } from 'src/app/models/food-item';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-food-item-quatity',
  templateUrl: './food-item-quatity.component.html',
  styleUrls: ['./food-item-quatity.component.css']
})
export class FoodItemQuatityComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('item') foodItem: FoodItem;
  // tslint:disable-next-line: no-input-rename
  shoppingCart = new ShoppingCart();
  cart: FoodItem[] = [];
  totalCount;

  constructor() {
    this.totalCount = this.getQuantity;
  }

  addToCart() {
    this.shoppingCart.updateCart(this.foodItem);
    this.totalCount = this.getQuantity;
  }

  removeFromCart() {
    this.shoppingCart.removeFromCart(this.foodItem);
    this.totalCount = this.getQuantity;
  }

  getUpdatedQuantity() {
      return ShoppingCart.getQuantity(this.foodItem);
  }

  getQuantity() {
    let count = 0;
    this.cart.forEach(el => {
      count += el.quantity;
    });
    return count;
  }

  ngOnInit(): void {
  }

}
