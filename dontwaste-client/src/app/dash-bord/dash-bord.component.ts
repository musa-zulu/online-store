import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../models/food-item';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { FoodItemsService } from '../services/food-items.service';

@Component({
  selector: 'app-dash-bord',
  templateUrl: './dash-bord.component.html',
  styleUrls: ['./dash-bord.component.css']
})
export class DashBordComponent implements OnInit {
  foodItems: FoodItem[] = [];
  filteredFoodItems: FoodItem[] = [];
  foodCategory: FoodItem;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private foodItemService: FoodItemsService,
    private shoppingCartService: ShoppingCartService
  ) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.foodItemService
      .getFoodItems()
      .map(foodItems => {
        this.foodItems = foodItems;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        //this.foodCategory = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredFoodItems = (this.foodCategory) ?
    this.foodItems.filter(p => p.foodCategoryId === this.foodCategory.foodCategoryId) :
    this.foodItems;
  }
}
