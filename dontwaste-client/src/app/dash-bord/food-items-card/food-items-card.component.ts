import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { FoodItem } from 'src/app/models/food-item';

@Component({
  selector: 'app-food-items-card',
  templateUrl: './food-items-card.component.html',
  styleUrls: ['./food-items-card.component.css']
})
export class FoodItemsCardComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('foodItem') foodItem: FoodItem;
  // tslint:disable-next-line: no-input-rename
  @Input('show-actions') showActions = true;
  // tslint:disable-next-line: no-input-rename
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.foodItem);
  }

  ngOnInit(): void {
  }
}
