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
  shoppingCart;
  cartItems: FoodItem[] = [];
  totalCount;
  currentCartItems;

  constructor() {
    this.totalCount = this.getQuantity;
    setInterval(() => { this.getCartItems(); }, 1000);

    this.currentCartItems = this.shoppingCart;
  }

  getCartItems() {
    this.cartItems = ShoppingCart.getShoppingCart();
    return this.cartItems;
  }

  addToCart() {
    this.shoppingCart.updateCart(this.foodItem);
    this.totalCount = this.getQuantity;
  }

  removeFromCart() {
    this.shoppingCart.removeFromCart(this.foodItem);
    this.totalCount = this.getQuantity;
  }

  getQuantity() {
    let count = 0;
    this.shoppingCart.items.forEach(el => {
      count += el.quantity;
    });
    return count;
  }

  ngOnInit(): void {
    this.shoppingCart = new ShoppingCart();
  }

}
