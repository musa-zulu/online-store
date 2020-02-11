import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
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
  @Input('shopping-cart') shoppingCart;
  totalCount;

  constructor(private cartService: ShoppingCartService) {


    console.log("nay leshandisi : " + this.totalCount);
  }

  addToCart() {
    //this.cartService.addToCart(this.foodItem);
  }

  removeFromCart() {
    //this.cartService.removeFromCart(this.foodItem);
  }

  get getQuantity() {
    let quantity = 0;
    ShoppingCart.getShoppingCart().forEach(el => {
      quantity = ShoppingCart.getQuantity(el);
    });
    return quantity;
  }

  ngOnInit(): void {
  }

}
