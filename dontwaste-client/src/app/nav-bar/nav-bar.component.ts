import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.shoppingCart();
  }

  async shoppingCart()  {
    //this.cart$ = await this.shoppingCartService.getCart();
  }

}
