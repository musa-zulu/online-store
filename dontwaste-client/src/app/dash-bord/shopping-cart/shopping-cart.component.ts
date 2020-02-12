import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { FoodItem } from 'src/app/models/food-item';
import { timer } from 'rxjs/internal/observable/timer';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Order } from 'src/app/models/order';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  static readonly POLLING_INTERVAL = 3000;
  //cart: ShoppingCart[] = [];
  cartItems: FoodItem[] = [];
  totalCount: number;
  totalPrice;
  shoppingCart = new ShoppingCart();
  cart: FoodItem[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {
    setInterval(() => { this.getTotalPrice(); }, 1000);
    setInterval(() => { this.getTotalCount(); }, 1000);
    setInterval(() => { this.getTotalCount(); }, 1000);
  }

  ngOnInit() {
    this.cartItems = ShoppingCart.getShoppingCart();
    this.getTotalPrice();
    this.totalCount = this.shoppingCart.getTotalCount();
    this.getCartItems();
  }

  clearCart() {
    localStorage.clear();
    this.totalCount = 0;
    this.cart = [];
  }

  getTotalPrice() {
    this.totalPrice = ShoppingCart.totalPrice(this.cartItems);
    return this.totalPrice;
  }

  getTotalCount() {
    this.totalCount = this.shoppingCart.getTotalCount();
    return this.totalCount;
  }

  checkOut() {
    this.shoppingCartService.saveOrder(this.pupulateItemsInCart());
  }

  getCartItems() {
    this.cart = ShoppingCart.getShoppingCart();
    return this.cart;
  }

  pupulateItemsInCart() {
    const length = localStorage.length;
    const order = new Order();
    let total = 0;
    if (length > 0) {
      for (let i = 0; i <= length; i++) {
          const cartItem = JSON.parse(localStorage.getItem('CartItem' + i));
          if (cartItem !== null) {
            total += cartItem[0].totalPrice;
            order.foodItems.push({
              dishName: cartItem[0].dishName,
              foodCategoryId: cartItem[0].foodCategoryId,
              foodItemDescription: cartItem[0].foodItemDescription,
              foodItemId: cartItem[0].foodItemId,
              totalPrice: total,
              price: cartItem[0].price,
              quantity: cartItem[0].quantity,
              key: cartItem[0].key,
              shoppingCartId: cartItem[0].shoppingCartId
            });
          }
      }
    }
    return order;
  }
}
