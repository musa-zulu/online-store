import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { FoodItem } from 'src/app/models/food-item';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  static readonly POLLING_INTERVAL = 1000;
  cartItems: FoodItem[] = [];
  totalCount: number;
  totalPrice;
  shoppingCart = new ShoppingCart();

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
    setInterval(() => { this.getTotalPrice(); }, ShoppingCartComponent.POLLING_INTERVAL);
    setInterval(() => { this.getTotalCount(); }, ShoppingCartComponent.POLLING_INTERVAL);
    setInterval(() => { this.getCartItems(); }, ShoppingCartComponent.POLLING_INTERVAL);
  }

  ngOnInit() {
    this.getCartItems();
    this.getTotalPrice();
    this.totalCount = this.shoppingCart.getTotalCount();
  }

  clearCart() {
    localStorage.clear();
    this.totalCount = 0;
    this.cartItems = [];
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
    this.openConfirmationDialog();
  }

  getCartItems() {
    this.cartItems = ShoppingCart.getShoppingCart();
    return this.cartItems;
  }

  openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to place this order... ?')
    .then((confirmed) => {
      if (confirmed) {
        this.shoppingCartService.saveOrder(this.pupulateItemsInCart());
        this.router.navigate(['/orders']);
      }
      console.log('User confirmed:', confirmed);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  addToCart(foodItem: FoodItem) {
    this.shoppingCart.updateCart(foodItem);
  }

  removeFromCart(foodItem: FoodItem) {
    this.shoppingCart.removeFromCart(foodItem);
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
