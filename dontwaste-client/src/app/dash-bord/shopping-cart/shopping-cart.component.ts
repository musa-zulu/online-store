import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { FoodItem } from 'src/app/models/food-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart[] = [];
  cartItems: FoodItem[] = [];
  totalCount: number;
  totalPrice;
  constructor() { }
  shoppingCart = new ShoppingCart();

  ngOnInit() {
    this.cartItems = ShoppingCart.getShoppingCart();
    this.totalPrice = ShoppingCart.totalPrice(this.cartItems);
    this.totalCount = this.shoppingCart.getTotalCount();
  }

  clearCart() {
    localStorage.clear();
    this.totalCount = 0;
    this.cart = [];
  }
}
