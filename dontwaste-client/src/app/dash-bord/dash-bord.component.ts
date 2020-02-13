import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../models/food-item';
import { ShoppingCart } from '../models/shopping-cart';
import { FoodCategoriesService } from '../services/food-categories.service';
import { FoodCategory } from '../models/food-category';

@Component({
  selector: 'app-dash-bord',
  templateUrl: './dash-bord.component.html',
  styleUrls: ['./dash-bord.component.css']
})
export class DashBordComponent implements OnInit {
  static readonly POLLING_INTERVAL = 1000;
  cartItems: FoodItem[];
  currentCategory: string;
  categories: FoodCategory[];
  foodItems: FoodItem[] = [];
  filteredFoodItems: FoodItem[] = [];
  foodCategory: FoodCategory;
  executed = false;

  constructor(private foodCategoriesService: FoodCategoriesService) {
    this.getCategories();
    this.setCurrentCategory(null);
  }

  async ngOnInit() {
    this.cartItems = this.getCart();
    this.setCurrentCategory(null);
    this.filteredFoodItems = this.foodItems;
  }

  getCategories() {
     this.foodCategoriesService.getFoodCategories()
    .subscribe(async (foodCategories) => {
       this.categories = await foodCategories.data;
       if (!this.executed) {
        this.executed = true;
       this.populateFoodItemsFor(this.categories);
       }
    });
  }

  setCurrentCategory(newCategory: string) {
      this.currentCategory = newCategory;
      if (newCategory === null)   {
         this.getCategories();
      }
      this.applyFilter(newCategory);
  }

  getCart() {
    return ShoppingCart.getShoppingCart();
  }

  populateFoodItemsFor(categories: FoodCategory[]) {
    categories.forEach(element => {
      element.foodItems.forEach(fi => {
        if (this.filteredFoodItems.indexOf(fi) === -1) {
          this.filteredFoodItems.push(fi);
        }
      });
    });
  }

  private applyFilter(foodCategoryId: string) {
    let category = [];
    this.foodItems = [];
    if (foodCategoryId !== null) {
      category = this.categories.filter(x => x.foodCategoryId === foodCategoryId);
      this.foodItems = category[0].foodItems;
    } else {
      (this.categories || []).forEach(cItem => {
        cItem.foodItems.forEach(item => {
          if (this.foodItems.indexOf(item) === -1) {
            this.foodItems.push(item);
          }
        });
      });
    }
  }
}
