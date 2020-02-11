import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-food-items-card',
  templateUrl: './food-items-card.component.html',
  styleUrls: ['./food-items-card.component.css']
})
export class FoodItemsCardComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('foodItem') foodItem: any;
  // tslint:disable-next-line: no-input-rename
  @Input('show-actions') showActions = true;
  shoppingCart = new ShoppingCart();
  constructor() { }

  addToCart() {
   this.shoppingCart.updateCart(this.foodItem);
  }
  ngOnInit(): void {
  }
}
