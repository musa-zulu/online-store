import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../models/food-item';
import { timer } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { FoodCategoriesService } from '../services/food-categories.service';
import { FoodCategory } from '../models/food-category';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dash-bord',
  templateUrl: './dash-bord.component.html',
  styleUrls: ['./dash-bord.component.css']
})
export class DashBordComponent implements OnInit {
  static readonly POLLING_INTERVAL = 10000;
  cart: FoodItem[];
  currentCategory: string;
  categories: FoodCategory[];
  foodItems: FoodItem[] = [];
  filteredFoodItems: FoodItem[] = [];
  foodCategory: FoodCategory;

  constructor(private foodCategoriesService: FoodCategoriesService) {
              }

  ngOnInit() {
    this.getAllCategories();
    this.cart = this.getCart();
    this.filteredFoodItems = this.foodItems;
  }

  getCategories() {
      return timer(0, DashBordComponent.POLLING_INTERVAL)
      .pipe(switchMap(() => this.foodCategoriesService.getFoodCategories()));
  }

  setCurrentCategory(newCategory: string) {
      this.currentCategory = newCategory;
      if (newCategory === null)   {
        this.getAllCategories();
      }
      this.applyFilter(newCategory);
  }

  getCart() {
    return ShoppingCart.getShoppingCart();
  }

  private getAllCategories() {
    this.getCategories()
    .subscribe((foodCategories) => {
      this.categories = foodCategories.data;
      console.log();
    });
  }

  private applyFilter(foodCategoryId: string) {
    let category = [];
    if (foodCategoryId !== null) {
      category = this.categories.filter(x => x.foodCategoryId === foodCategoryId);
      this.foodItems = category[0].foodItems;
    } else {
      this.categories.forEach(cItem => {
        cItem.foodItems.forEach(item => {
          if (this.foodItems.indexOf(item) === -1) {
            this.foodItems.push(item);
          }
        });
      });
    }
    this.filteredFoodItems = this.foodItems;
  }
}
